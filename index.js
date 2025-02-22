import jq from "node-jq";
import express from "express";
const __dirname = new URL('.', import.meta.url).pathname;

const app = express();

app.use(express.json());

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
		console.error(err.stack);
        return res.send("Error parsing JSON. Make sure you are sending valid JSON");
    }
    next();
});

app.post('/', async (req, res) => {
	const filter = req.query.q;
	const jsonPayload = req.body;

	console.log();
	console.log(new Date().toLocaleString());
	console.log("filter", filter);
	console.log("jsonPayload", jsonPayload);

	jq.run(
		filter,
		jsonPayload,
		{
			input: "json",
			output: "json"
		}
	).then(output => {
		console.log("output", output);
		if(typeof output !== 'object') {
			res.send(output.toString());
		} else {
			res.send(JSON.stringify(output, null, 2));
		}
	}).catch(e => {
		console.error(e);
		res.send("Error parsing query. Double check query syntax.");
	});
});

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/playground.html');
});

app.listen(8080);
