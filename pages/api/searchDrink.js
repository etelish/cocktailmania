export default async function searchDrinkHandler(req, res) {
    const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${req.query.s}`,
    );
    if (!response) {
        throw new Error('Woops');
    }
    const data = await response.json();
    const sanitized = data.drinks === null ? { drinks: [] } : data;
    res.status(200).json(sanitized);
}
