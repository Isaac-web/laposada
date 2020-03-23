  //Declare variables for the Mobile nav
  var navtab, i;
  navtab = document.getElementsByClassName("dropbtn1"); // Target the nav links

  for (let i = 0; i < navtab.length; i++) {
      navtab[i].addEventListener('click', function() {
          this.classList.toggle("toggledropbtn");

      var dropcontnet = this.nextElementSibling;
          if(dropcontnet.style.display === "block") {
              dropcontnet.style.display = "none";
          }

          else {
              dropcontnet.style.display = "block"
          }
      });
  };


  //For mobile menu

  
  var header, navIcon; //Declare variables

  //Target Elements for the Menu

  header = document.getElementsByClassName("heaerwrapper")[0];
  navIcon = document.getElementsByClassName('mobilenavIcon')[0];

  navIcon.addEventListener('click', () => {
      header.classList.toggle('changeline');
  }) 


