// ==========================================
// XANORA AI — CONTACT FORM API
// ==========================================

export async function onRequestPost(context) {
    try {
        const data = await context.request.json();

        const {
            name,
            email,
            organization,
            service,
            message
        } = data;

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

        return new Response(
            JSON.stringify({
                success: true,
                message: "Inquiry received."
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