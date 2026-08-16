function initParagraphApp() {
    const input = document.querySelector("#input");
    const button = document.querySelector("#button");
    const container = document.querySelector("#paragraphs");

    input.addEventListener("input", () => {
        button.hidden = input.value === "";
    });

    button.addEventListener("click", () => {
        const paragraph = document.createElement("p");
        paragraph.textContent = input.value;

        container.append(paragraph);

        if (container.querySelectorAll("p").length > 4) {
            container.querySelector("p").remove();
        }
    });
}

module.exports = initParagraphApp;