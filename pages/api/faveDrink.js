export default async function faveDrink(req, res) {
    const { user } = req.query;
    console.log(user);
    if (req.method === 'POST') {
        const grabFaveDrink = JSON.parse(req.body).map((drinkId) =>
            fetch(
                `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`,
            ),
        );
        const faves = await Promise.all(grabFaveDrink);
        const results = faves.map((fave) => fave.json());
        const cocktailInfo = await Promise.all(results).then((rawData) => ({
            drinks: rawData.map((x) => x.drinks[0]),
        }));

        res.status(200).json(cocktailInfo);
    }
}
// {
//     drinks: [{ strDrink: mojito }, { strDrink: mojito }];
// }
