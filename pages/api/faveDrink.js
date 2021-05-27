export default async function faveDrink(req, res) {
    const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${req}`,
    );
    if (!response) {
        throw new Error('Woops');
    }
    const data = await response.json();
    res.status(200).json(data);
}
