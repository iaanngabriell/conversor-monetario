// Busca valores digitado e as moedas de origem e destino
async function convert() {
    const valor = parseFloat(document.getElementById("valor").value);
    const moedaOrigem = document.getElementById("moedaOrigem").value;
    const moedaDestino = document.getElementById("moedaDestino").value;
    const API_KEY = "17e5330206f060e870f2cd8d0c98bfbf"

    // Veririfacar Valor
    if (isNaN(valor) || valor <= 0) {
        document.querySelector(".result").innerHTML = `
            <p class="text-warning">⚠️ Por favor, insira um valor numérico maior que zero!</p>
        `;
        return;
    }

    try {
        const url = `https://api.exchangerate.host/convert`
                  + `?access_key=${API_KEY}`
                  + `&from=${moedaOrigem}`
                  + `&to=${moedaDestino}`
                  + `&amount=${valor}`;

        const resposta = await fetch(url);

        // Verifica se a resposta HTTP foi bem-sucedida
        if (!resposta.ok) {
            throw new Error(`Erro HTTP: ${resposta.status}`);
        }

        const dados = await resposta.json();
        console.log('Resposta da API:', dados);

        // Verifica se o campo 'result' existe antes de usar
        if (dados && typeof dados.result === 'number') {
            document.querySelector(".result").innerHTML = `
                <p class="text-success">✅ ${valor} ${moedaOrigem} equivalem a <strong>${dados.result.toFixed(2)} ${moedaDestino}</strong>.</p>
            `;
        } else {
            document.querySelector(".result").innerHTML = `
                <p class="text-danger">❌ Não foi possível obter a taxa de câmbio. Tente novamente mais tarde!</p>
            `;
        }
    } catch (erro) {
        console.error("Erro ao converter:", erro);
        document.querySelector(".result").innerHTML = `
            <p class="text-danger">🚫 Ocorreu um erro ao buscar os dados da conversão: ${erro.message}</p>
        `;
    }
}
