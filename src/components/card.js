import axios from "axios";

// TASK 5
// ---------------------
// Implement this function, which should return the markup you see below.
// It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
// The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
// The text inside elements will be set using their `textContent` property (NOT `innerText`).
// Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
//
// <div class="card">
//   <div class="headline">{ headline }</div>
//   <div class="author">
//     <div class="img-container">
//       <img src={ authorPhoto }>
//     </div>
//     <span>By { authorName }</span>
//   </div>
// </div>
//
const Card = (article) => {
	const cardDiv = document.createElement("div");
	cardDiv.classList.add("card");
	let headlineDiv = document.createElement("div");
	headlineDiv.classList.add("headline");
	headlineDiv.textContent = article.headline;
	let authorDiv = document.createElement("div");
	authorDiv.classList.add("author");
	let authImg = document.createElement("div");
	authImg.classList.add("img-container");
	let imgSrc = document.createElement("img");
	imgSrc.src = article.authorPhoto;
	let span = document.createElement("span");
	span.textContent = "By " + article.authorName;

	cardDiv.appendChild(headlineDiv);
	cardDiv.appendChild(authorDiv);
	authorDiv.appendChild(authImg);
	authImg.appendChild(imgSrc);
	authorDiv.appendChild(span);

	return cardDiv;
};

// TASK 6
// ---------------------
// Implement this function that takes a css selector as its only argument.
// It should obtain articles from this endpoint: `http://localhost:5001/api/articles` (test it with console.log!!).
// However, the articles do not come organized in a single, neat array. Inspect the response closely!
// Create a card from each and every article object in the response, using the Card component.
// Append each card to the element in the DOM that matches the selector passed to the function.
//

const cardAppender = async (selector) => {
	let element = document.querySelector(selector);
	await axios
		.get("http://localhost:5001/api/articles")
		.then((data) => {
			let res = data.data.articles;
			for (const [key, value] of Object.entries(res)) {
				value.forEach((elem) => {
					const card = Card(elem);
					element.appendChild(card);
				});
			}
		})
		.catch((err) => {
			console.log(err);
		});
};

export { Card, cardAppender };
