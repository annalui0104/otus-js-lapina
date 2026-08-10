/**
 * @jest-environment jsdom
 */

const initParagraphApp = require("../src/homework/lesson4/paragraph");

describe("Приложение с параграфами", () => {
    let input;
    let button;
    let container;

    const renderApp = () => {
        document.body.innerHTML = `
    <div id="paragraphs">
      <p>Первый</p>
      <p>Второй</p>
      <p>Третий</p>
    </div>

    <input id="input" />
    <button id="button" hidden>Добавить</button>
  `;

        input = document.querySelector("#input");
        button = document.querySelector("#button");
        container = document.querySelector("#paragraphs");

        initParagraphApp();
    };

    const enterText = (text) => {
        input.value = text;
        input.dispatchEvent(new Event("input"));
    };

    const clickAdd = () => {
        button.click();
    };

    const getParagraphs = () => {
        return [...container.querySelectorAll("p")];
    };

    const getParagraphTexts = () => {
        return getParagraphs().map((paragraph) => paragraph.textContent);
    };

    beforeEach(() => {
        renderApp();
    });

    test("при загрузке отображаются три параграфа", () => {
        expect(getParagraphs()).toHaveLength(3);
    });

    test("кнопка скрыта, если поле пустое", () => {
        expect(button.hidden).toBe(true);
    });

    test("кнопка появляется после ввода текста", () => {
        enterText("Новый параграф");

        expect(button.hidden).toBe(false);
    });

    test("кнопка снова скрывается после очистки поля", () => {
        enterText("Новый параграф");
        enterText("");

        expect(button.hidden).toBe(true);
    });

    test("по клику добавляется новый параграф", () => {
        enterText("Новый параграф");
        clickAdd();

        expect(getParagraphs()).toHaveLength(4);
    });

    test("добавленный параграф содержит введенный текст", () => {
        enterText("Привет, мир!");
        clickAdd();

        expect(getParagraphTexts()).toContain("Привет, мир!");
    });

    test("новый параграф добавляется последним", () => {
        enterText("Четвертый");
        clickAdd();

        expect(getParagraphTexts()).toEqual([
            "Первый",
            "Второй",
            "Третий",
            "Четвертый",
        ]);
    });

    test("при четырех параграфах первый не удаляется", () => {
        enterText("Четвертый");
        clickAdd();

        expect(getParagraphTexts()[0]).toBe("Первый");
    });

    test("при добавлении пятого параграфа первый удаляется", () => {
        enterText("Четвертый");
        clickAdd();

        enterText("Пятый");
        clickAdd();

        expect(getParagraphTexts()).not.toContain("Первый");
    });

    test("после добавления пятого параграфа остается четыре", () => {
        enterText("Четвертый");
        clickAdd();

        enterText("Пятый");
        clickAdd();

        expect(getParagraphs()).toHaveLength(4);
    });

    test("после удаления первого сохраняется правильный порядок", () => {
        enterText("Четвертый");
        clickAdd();

        enterText("Пятый");
        clickAdd();

        expect(getParagraphTexts()).toEqual([
            "Второй",
            "Третий",
            "Четвертый",
            "Пятый",
        ]);
    });

    test("при следующем добавлении снова удаляется самый старый параграф", () => {
        enterText("Четвертый");
        clickAdd();

        enterText("Пятый");
        clickAdd();

        enterText("Шестой");
        clickAdd();

        expect(getParagraphTexts()).toEqual([
            "Третий",
            "Четвертый",
            "Пятый",
            "Шестой",
        ]);
    });

    test("после большого количества добавлений остается четыре параграфа", () => {
        for (let i = 1; i <= 10; i++) {
            enterText(`Новый ${i}`);
            clickAdd();
        }

        expect(getParagraphs()).toHaveLength(4);
    });

    test("можно добавить параграф из одного символа", () => {
        enterText("A");
        clickAdd();

        expect(getParagraphTexts()).toContain("A");
    });

    test("текст с пробелами сохраняется", () => {
        enterText("Это новый параграф");
        clickAdd();

        expect(getParagraphTexts()).toContain("Это новый параграф");
    });

    test("специальные символы сохраняются", () => {
        enterText("Hello, world! #2026");
        clickAdd();

        expect(getParagraphTexts()).toContain("Hello, world! #2026");
    });

    test("русский текст сохраняется", () => {
        enterText("Новый текст на русском языке");
        clickAdd();

        expect(getParagraphTexts()).toContain(
            "Новый текст на русском языке"
        );
    });
});