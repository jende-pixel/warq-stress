export async function onRequestPost(context) {
    try {
        // Panelden gelen verileri oku (layer, target, method, time)
        const body = await context.request.json();
        
        // Loglama: Gelen test isteğini Cloudflare konsolunda görebilmek için
        console.log(`[WARQ-STRESS] Yeni Test Başlatıldı:`, body);

        // İstek başarıyla yakalandı yanıtı dön
        return new Response(JSON.stringify({ 
            success: true, 
            message: "WARQ Altyapı köprüsü aktif. İstek başarıyla iletildi.",
            data: {
                target: body.target,
                method: body.method,
                duration: body.time
            }
        }), {
            headers: { 
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*" 
            }
        });
    } catch (err) {
        // Hata durumunda fırlatılacak yanıt
        return new Response(JSON.stringify({ 
            success: false, 
            error: err.message 
        }), { 
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}

// CORS istekleri (ön kontroller) için OPTIONS desteği
export async function onRequestOptions() {
    return new Response(null, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type"
        }
    });
}

