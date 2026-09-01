// ==========================================
// XANORA AI — CONTACT FORM API
// Sends contact inquiries through Resend
// ==========================================

export async function onRequestPost(context) {
    try {

        // ==========================================
        // REQUEST SECURITY
        // ==========================================

        if (context.request.method !== "POST") {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "Method not allowed."
                }),
                {
                    status: 405,
                    headers: {
                        "Content-Type": "application/json",
                        "Allow": "POST"
                    }
                }
            );
        }

        const contentType =
            context.request.headers.get("content-type") || "";

        if (!contentType.toLowerCase().includes("application/json")) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "Invalid request format."
                }),
                {
                    status: 415,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
        }

        const contentLength =
            Number(
                context.request.headers.get("content-length") || 0
            );

        if (contentLength > 25_000) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "Request is too large."
                }),
                {
                    status: 413,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
        }

        const data = await context.request.json();

        const {
            name,
            email,
            country,
            phone,
            organization,
            service,
            message
        } = data;

        // ==========================================
        // VALIDATE INPUT
        // ==========================================
 
         const cleanName = String(name || "").trim();
         const cleanEmail = String(email || "").trim();
         const cleanCountry = String(country || "").trim();
         const cleanPhone = String(phone || "").trim();
         const cleanOrganization = String(organization || "").trim();
         const cleanService = String(service || "").trim();
         const cleanMessage = String(message || "").trim();

         if (
             !cleanName ||
             !cleanEmail ||
             !cleanService ||
             !cleanMessage
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


       // ==========================================
       // FIELD LENGTH LIMITS
       // ==========================================

         if (
             cleanName.length > 100 ||
             cleanEmail.length > 254 ||
             cleanCountry.length > 100 ||
             cleanPhone.length > 40 ||
             cleanOrganization.length > 150 ||
             cleanService.length > 100 ||
             cleanMessage.length > 5000
            ) {
             return new Response(
                 JSON.stringify({
                      success: false,
                     message: "One or more fields are too long."
                    }),
                  {
                     status: 400,
                     headers: {
                        "Content-Type": "application/json"
                    }
               }
            );
        }
 

      // ==========================================
      // EMAIL FORMAT
      // ==========================================

         const emailPattern =
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

         if (!emailPattern.test(cleanEmail)) {
            return new Response(
               JSON.stringify({
                     success: false,
                      message: "Please provide a valid email address."
                   }),
                   {
                     status: 400,
                     headers: {
                          "Content-Type": "application/json"
                        }
                   }
               );
            }

        

        // ==========================================
        // VALIDATE SERVICE
        // ==========================================

       const allowedServices = [
          "AI for Everyday Life",
          "AI Consulting",
          "AI Automation",
          "Automation",
          "Business Integration",
          "Custom AI Solution",
          "Custom AI Software",
          "AI Training",
          "AI Strategy",
          "Something Else"
        ];

        if (!allowedServices.includes(cleanService)) {
           return new Response(
             JSON.stringify({
                 success: false,
                 message: "Please select a valid service."
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
            <p><strong>Country:</strong> ${escapeHtml(
                country || "Not provided"
            )}</p>
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



// Prevent HTML injection in the email body
function escapeHtml(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    }
}