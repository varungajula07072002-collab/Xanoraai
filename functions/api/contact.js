// ==========================================
// XANORA AI — CONTACT FORM API
// Sends contact inquiries through Resend
// ==========================================

export async function onRequestPost(context) {
    try {
        const data = await context.request.json();

        const {
            name,
            email,
            phone,
            organization,
            service,
            message
        } = data;

        // Validate required fields
        if (!name || !email || !service || !message) {
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

        // Get the Resend API key from Cloudflare
        const resendApiKey = context.env.RESEND_API_KEY;

        if (!resendApiKey) {
            console.error("RESEND_API_KEY is not configured.");

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

        // Build the email content
        const html = `
            <h2>New Xanora AI Inquiry</h2>

            <p><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
            <p><strong>Mobile:</strong> ${escapeHtml(
                phone || "Not provided"
            )}</p>
            <p><strong>Organization:</strong> ${escapeHtml(
                organization || "Not provided"
            )}</p>
            <p><strong>Service:</strong> ${escapeHtml(service)}</p>

            <h3>Inquiry</h3>
            <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>

            <hr>

            <p>
                This inquiry was submitted through the
                Xanora AI website contact form.
            </p>
        `;

        // Send the inquiry through Resend
        const resendResponse = await fetch(
            "https://api.resend.com/emails",
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${resendApiKey}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    from: "Xanora AI <info@xanoraai.com>",
                    to: ["info@xanoraai.com"],
                    reply_to: email,
                    subject: `New Inquiry from ${name}`,
                    html: html
                })
            }
        );

        const resendData = await resendResponse.json();

        // Resend rejected the email
        if (!resendResponse.ok) {
            console.error("Resend API error:", resendData);

            return new Response(
                JSON.stringify({
                    success: false,
                    message: "Unable to send your inquiry."
                }),
                {
                    status: 502,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
        }

        // Email was accepted by Resend
        console.log("Inquiry email sent:", resendData);

        return new Response(
            JSON.stringify({
                success: true,
                message: "Inquiry sent successfully."
            }),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

    } catch (error) {
        console.error("Contact API error:", error);

        return new Response(
            JSON.stringify({
                success: false,
                message: "Unable to process your inquiry."
            }),
            {
                status: 500,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
    }
}


// Prevent HTML injection in the email body
function escapeHtml(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}