const TEAMTAILOR_API_URL = process.env.TEAMTAILOR_API_URL || "https://api.teamtailor.com";
const TEAMTAILOR_API_KEY = process.env.TEAMTAILOR_API_KEY || "";

const headers = {
  "Authorization": `Token token=${TEAMTAILOR_API_KEY}`,
  "X-Api-Version": "20161108",
  "Content-Type": "application/vnd.api+json",
};

export interface CandidateData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  resumeUrl?: string;
}

export interface TeamtailorError {
  status: number;
  message: string;
}

/**
 * Upload a file to Teamtailor's temporary storage
 * Returns the URI to be used in candidate creation
 */
export async function uploadFile(
  fileBuffer: Buffer,
  filename: string,
  mimeType: string
): Promise<string> {
  const base64Content = fileBuffer.toString("base64");

  const response = await fetch(`${TEAMTAILOR_API_URL}/v1/uploads`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      data: {
        type: "uploads",
        attributes: {
          "file-name": filename,
          "file-type": mimeType,
          "content": base64Content,
        },
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Teamtailor upload error:", errorText);
    throw new Error(`Failed to upload file: ${response.status}`);
  }

  const data = await response.json();
  return data.data.attributes.url;
}

/**
 * Create a new candidate in Teamtailor
 * Returns the candidate ID
 */
export async function createCandidate(candidateData: CandidateData): Promise<string> {
  const attributes: Record<string, string | boolean> = {
    "first-name": candidateData.firstName,
    "last-name": candidateData.lastName,
    "email": candidateData.email,
    "phone": candidateData.phone,
    "merge": true, // Merge with existing candidate if email matches
  };

  if (candidateData.resumeUrl) {
    attributes["resume"] = candidateData.resumeUrl;
  }

  const response = await fetch(`${TEAMTAILOR_API_URL}/v1/candidates`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      data: {
        type: "candidates",
        attributes,
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Teamtailor candidate creation error:", errorText);
    throw new Error(`Failed to create candidate: ${response.status}`);
  }

  const data = await response.json();
  return data.data.id;
}

/**
 * Create a job application linking a candidate to a specific job
 */
export async function createJobApplication(
  candidateId: string,
  jobId: string
): Promise<string> {
  const response = await fetch(`${TEAMTAILOR_API_URL}/v1/job-applications`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      data: {
        type: "job-applications",
        relationships: {
          candidate: {
            data: {
              type: "candidates",
              id: candidateId,
            },
          },
          job: {
            data: {
              type: "jobs",
              id: jobId,
            },
          },
        },
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Teamtailor job application error:", errorText);
    throw new Error(`Failed to create job application: ${response.status}`);
  }

  const data = await response.json();
  return data.data.id;
}

/**
 * Get the job ID based on the selected language
 */
export function getJobIdByLanguage(language: "fr" | "nl"): string {
  const jobIds = {
    fr: process.env.TEAMTAILOR_JOB_ID_FRENCH || "6450861",
    nl: process.env.TEAMTAILOR_JOB_ID_DUTCH || "6863846",
  };
  return jobIds[language];
}
