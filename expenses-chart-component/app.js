const graph = document.querySelector('.graph tbody');
const request = new Request('data.json');

(async () => {
    const response = await fetch(request);
    const graphData = await response.json();
    
    const today = (new Date().getDay() + 6) % 7; // adjust index as JS Date `0` == Sunday not Monday
    let valueMax = Math.max(...graphData.map(i => i.amount)); // get Max amount to use for --size calculation
 
    let markup = graphData.map((data, index) => `
        <tr>
            <th scope="row">${data.day}</th>
            <td style="--size: ${data.amount / valueMax}" ${index == today ? 'data-highlight-today' : ''}><span>$${data.amount}</span></td>
        </tr>
    `).join('');

    graph.innerHTML = markup;
})();

