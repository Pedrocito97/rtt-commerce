import { NextRequest, NextResponse } from "next/server";
import {
  createCandidate,
  createJobApplication,
  getJobIdByLanguage,
} from "@/lib/teamtailor";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Extract form fields
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const countryCode = formData.get("countryCode") as string;
    const phone = formData.get("phone") as string;
    const language = formData.get("language") as "fr" | "nl";
    // CV file is collected but not uploaded to Teamtailor yet
    // Teamtailor requires a public URL for resume upload which needs external storage
    // const cvFile = formData.get("cv") as File | null;

    // Validate required fields
    if (!firstName || !lastName || !email || !countryCode || !phone || !language) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate language
    if (language !== "fr" && language !== "nl") {
      return NextResponse.json(
        { error: "Invalid language selection" },
        { status: 400 }
      );
    }

    // Format phone number with country code
    const fullPhone = `${countryCode}${phone.replace(/^0+/, "")}`;

    // Create candidate in Teamtailor (without resume for now)
    const candidateId = await createCandidate({
      firstName,
      lastName,
      email,
      phone: fullPhone,
    });

    // Get the appropriate job ID based on language
    const jobId = getJobIdByLanguage(language);

    // Create job application linking candidate to the job
    await createJobApplication(candidateId, jobId);

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully",
      candidateId,
    });
  } catch (error) {
    console.error("Application submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit application. Please try again later." },
      { status: 500 }
    );
  }
}
