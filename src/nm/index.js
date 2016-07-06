import Application from "./app/Application";

function main()
{
    const app = new Application();
    app.placeAt(document.body);
    app.run();
}

$(main);
