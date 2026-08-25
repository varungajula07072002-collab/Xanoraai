// ==========================================
// XANORA AI — CONSULTATION REQUEST API
// Sends consultation requests through Resend
// ==========================================

export async function onRequestPost(context) {
    try {
        const data = await context.request.json();

        const {
            name,
            email,
            phone,
            reason,
            description,
            preferredDate,
            preferredTime,
            availability,
            meetingPreference,
            additional
        } = data;

        // Validate required fields
        if (
            !name ||
            !email ||
            !reason ||
            !description ||
            !preferredDate ||
            !availability ||
            !meetingPreference
        ) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "Please complete all required fields."
                }),
                {
                    status: 400,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
        }

        // A specific time requires a time value
        if (
            availability === "specific" &&
            !preferredTime
        ) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "Please provide your preferred time."
                }),
                {
                    status: 400,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
        }

        // Get Resend API key from Cloudflare
        const resendApiKey =
            context.env.RESEND_API_KEY;

        if (!resendApiKey) {
            console.error(
                "RESEND_API_KEY is not configured."
            );

            return new Response(
                JSON.stringify({
                    success: false,
                    message: "Email service is not configured."
                }),
                {
                    status: 500,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
        }

        // Format availability
        const availabilityText =
            availability === "specific"
                ? "Specific time"
                : "Flexible — any suitable time";

        // Format meeting preference
        const meetingText = {
            video: "Video Call",
            phone: "Phone Call",
            either: "Either is fine"
        }[meetingPreference] || meetingPreference;

        // Build email content
        const html = `
            <h2>New XANORA AI Consultation Request</h2>

            <p>
                <strong>Name:</strong>
                ${escapeHtml(name)}
            </p>

            <p>
                <strong>Email:</strong>
                ${escapeHtml(email)}
            </p>

            <p>
                <strong>Mobile:</strong>
                ${escapeHtml(phone || "Not provided")}
            </p>

            <p>
                <strong>Reason for Consultation:</strong>
                ${escapeHtml(reason)}
            </p>

            <h3>What They Would Like to Discuss</h3>

            <p>
                ${escapeHtml(description).replace(/\n/g, "<br>")}
            </p>

            <hr>

            <h3>Preferred Contact Time</h3>

            <p>
                <strong>Date:</strong>
                ${escapeHtml(preferredDate)}
            </p>

            <p>
                <strong>Time:</strong>
                ${escapeHtml(preferredTime || "Not specified")}
            </p>

            <p>
                <strong>Availability:</strong>
                ${escapeHtml(availabilityText)}
            </p>

            <p>
                <strong>Meeting Preference:</strong>
                ${escapeHtml(meetingText)}
            </p>

            <hr>

            <p>
                <strong>Additional Information:</strong>
                ${escapeHtml(
                    additional || "Not provided"
                ).replace(/\n/g, "<br>")}
            </p>

            <hr>

            <p>
                This consultation request was submitted
                through the XANORA AI website.
            </p>
        `;

        // Send through Resend
        const resendResponse = await fetch(
            "https://api.resend.com/emails",
            {
                method: "POST",

                headers: {
                    "Authorization":
                        `Bearer ${resendApiKey}`,

                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({
                    from:
                        "XANORA AI <info@xanoraai.com>",

                    to:
                        ["info@xanoraai.com"],

                    reply_to:
                        email,

                    subject:
                        `New Consultation Request — ${name}`,

                    html:
                        html
                })
            }
        );

        const resendData =
            await resendResponse.json();

        // Resend rejected the email
        if (!resendResponse.ok) {

            console.error(
                "Resend API error:",
                resendData
            );

            return new Response(
                JSON.stringify({
                    success: false,
                    message:
                        "Unable to send your consultation request."
                }),
                {
                    status: 502,
                    headers: {
                        "Content-Type":
                            "application/json"
                    }
                }
            );
        }

        // Email accepted by Resend
        console.log(
            "Consultation request sent:",
            resendData
        );

        return new Response(
            JSON.stringify({
                success: true,
                message:
                    "Consultation request sent successfully."
            }),
            {
                status: 200,
                headers: {
                    "Content-Type":
                        "application/json"
                }
            }
        );

    } catch (error) {

        console.error(
            "Consultation API error:",
            error
        );

        return new Response(
            JSON.stringify({
                success: false,
                message:
                    "Unable to process your consultation request."
            }),
            {
                status: 500,
                headers: {
                    "Content-Type":
                        "application/json"
                }
            }
        );
    }
}


// ==========================================
// PREVENT HTML INJECTION
// ==========================================

function escapeHtml(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}