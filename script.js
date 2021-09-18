var input = document.querySelector('#input1');
var card = document.getElementById("card");


let fulldata=[];

document.addEventListener("DOMContentLoaded",()=>{
    search();
})

// Function to get the input from searchbox
input.addEventListener("keyup",(x)=>{
    x.preventDefault();
    filterdata(x.target.value);
})

// Function to filter the data
function filterdata(text)
{
    const filtercity = fulldata.filter(x=>{
        const regex = new RegExp(`${text}`,'gi');
        return x.city.match(regex)|| x.state.match(regex);
    
    });
    display(filtercity);
}
// Function to fetch the api and get the details
async function search()
{
    try
    {
        const res = await fetch('https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json');
        const data = await res.json();
        fulldata = data;
        display(data);

    }
    catch(err)
    {
        const output = `<div class="card"><h5>Error : ${err.message}</h5></div>`
    }
}

// Function to display the data
function display(data)
{
    let output = "";
    if(data.length > 0)
    {
        data.forEach((x) => {
            output +=
            `<div class="card m-3 text-center p-3">
                <h5 id="city">City : ${x.city}</h5>
                <h6 id="growth">Growth : ${x.growth_from_2000_to_2013}</h6>
                <h6 id="lat">Latitude : ${x.latitude}</h6>
                <h6 id="lon">Longitude : ${x.longitude}</h6>
                <h6 id="pop">Population : ${x.population}</h6>
                <h6 id="rank">Rank : ${x.rank}</h6>
                <h6 id="state">State : ${x.state}</h6>
            </div>`
        });
    }
    else
    {
        output = `<div class="card mt-5 error"><h5>No City / State found</h5></div>`
    }
    card.innerHTML = output;
}


