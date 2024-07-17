import {Octokit} from "https://esm.sh/octokit";

// Octokit.js
// https://github.com/octokit/core.js#readme
const octokit = new Octokit({
    //auth: 'YOUR-TOKEN'
});

let repoTotal = 0;

async function getRepos() {
    return await octokit.request('GET /users/{username}/repos', {
        username: 'danieljromero15', headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    });
}

async function getBranches(repo) {
    return await octokit.request('GET /repos/{owner}/{repo}/branches', {
        owner: 'danieljromero15', repo: repo, headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    });
}

window.onload = function () {
    getRepos().then((repos) => {
        console.log("API status: " + repos.status);
        repoTotal = repos.data.length + 2; // plus 2 because projects forks
        repos.data.forEach(repository => {
            //console.log(repository);
            let i = 0;
            fetch(`https://raw.githubusercontent.com/${repository.full_name}/${repository.default_branch}/README.md`).then((READMEresponse) => READMEresponse.text().then(function (descResponse) {
                switch (repository.name) {
                    case "Shipwright-no-title-logos":
                        descResponse = "A fork of the Ocarina of Time PC Port, modified to remove the title screen logos. Used for Wallpaper Engine.";
                        break;
                    case "WiiSXRX":
                        descResponse = "A fork of a PSX emulator for the Wii";
                        break;
                    case "UWUVCI-Images":
                        descResponse = "Fixes an issue with a specific image in a repository for Wii U VC injections";
                        break;
                    case "danieljromero15.github.io":
                        i = 2;
                        break;
                    case "Archivist":
                        descResponse = "Software Engineering, Summer 2024. Final project, a video game completion log"
                        break;
                    case "imgStitch":
                        descResponse = "An old project from a few years ago that allowed me to put together a 36000x30000 combined image of a map of Breath of the Wild. Details are in the README";
                        break;
                    case "CSCI3000-Websites":
                        descResponse = descResponse.replace("Sites available at https://danieljromero15.github.io/CSCI3000-Websites/", "Sites available <a href=\"https://danieljromero15.github.io/CSCI3000-Websites/\">here</a>");
                        break;
                    case "Projects": // needs to list all branches
                        let projectsBranches = getBranches("Projects");
                        projectsBranches.then((branchesResponse) => {
                            branchesResponse.data.forEach(element => {
                                if (element.name === "master") return;
                                addToDivArray("personalDropRepos", [repository, element], "A fork of the popular \"Projects\" repository, that includes practical projects for any programming language. Developed in " + element.name);
                            })
                        });
                        return;
                }

                if (descResponse === '404: Not Found') descResponse = 'No README found.'

                if (descResponse.startsWith('# ')) descResponse = descResponse.replace('# ', '');

                if (repository.name.includes("CSCI") || repository.name.includes("Archivist")) {
                    addToDivArray("schoolProjectsDropRepos", repository, descResponse.split("\n")[i]);
                } else if (repository.fork) {
                    addToDivArray("forksRepos", repository, descResponse.split("\n")[i]);
                } else {
                    addToDivArray("personalDropRepos", repository, descResponse.split("\n")[i]);
                }
            }));
        })
    })
}

let personalArray = [];
let schoolArray = [];
let forksArray = [];
let repoN = 0;

// branches should pass repo as an array, with [repository, branch]
function addToDivArray(id, repo, desc) {
    //console.log(id);
    //let element = document.querySelector("#" + id + " > ul");
    //console.log(element.innerHTML);
    let lastPushDay = (Array.isArray(repo) ? repo[0].pushed_at : repo.pushed_at).substring(0, 10);

    const lastPush = new Date(lastPushDay);
    const oneDay = 1000 * 60 * 60 * 24;
    const d90DaysAgo = new Date(Date.now() - (oneDay * 30));

    let star = (lastPush >= d90DaysAgo) ? "*" : "";

    let to_add = `<li>${star}<a href="${repo.html_url}">${repo.name}</a> - ${desc}</li>`;
    if (Array.isArray(repo)) {
        to_add = `<li>${star}<a href="${repo[0].html_url}/tree/${repo[1].name}">${repo[0].name}/${repo[1].name}</a> - ${desc}</li>`;
    }

    switch (id) {
        case "personalDropRepos":
            personalArray.push(to_add);
            break;
        case "schoolProjectsDropRepos":
            schoolArray.push(to_add);
            break;
        case "forksRepos":
            forksArray.push(to_add);
            break;
    }
    //element.innerHTML += `<li><a href="${link}">${name}</a> - ${desc}</li>`
    repoN++;
    //console.log(repoN >= repoTotal);
    if (repoN >= repoTotal) {
        personalArray.sort(function (a, b) {
            return a.localeCompare(b);
        });
        schoolArray.sort(function (a, b) {
            return a.localeCompare(b);
        });
        forksArray.sort(function (a, b) {
            return a.localeCompare(b);
        });
        // This was painful to do in a loop, so I didn't
        document.querySelector("#personalDropRepos > ul").innerHTML = personalArray.join("");
        document.querySelector("#schoolProjectsDropRepos > ul").innerHTML = schoolArray.join("");
        document.querySelector("#forksRepos > ul").innerHTML = forksArray.join("");
    }
}