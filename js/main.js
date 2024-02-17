const myProjects = [
  {
    title: "Todolist",
    file: "todolist.png",
    link: "todolist.html",
  },
  {
    title: "Password generator",
    file: "password-generator.png",
    link: "password-generator.html",
  },
  {
    title: "Meteo",
    file: "meteo.png",
    link: "meteo.html",
  },
];

myProjects.forEach((myProject) => {
  document.querySelector("article").innerHTML += `
  <article><a href="pages/${myProject.link}">
    <img src="public/${myProject.file}" alt="${myProject.title}">
    <div>
      <h2>${myProject.title}</h2>
    </div>
  </a></article>`;
});
