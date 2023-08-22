export default function blackhole(elementId) {
    // Récupère l'élément HTML par son ID
    let element = document.getElementById(elementId);

    // Obtient les dimensions de l'élément pour le canvas
    let h = element.clientHeight,
        w = element.clientWidth,
        cw = w,
        ch = h,
        maxorbit = 255,
        centery = ch / 2,
        centerx = cw / 2;

    // Récupère le temps de départ et initialise le temps courant
    let startTime = new Date().getTime();
    let currentTime = 0;

    // Crée un tableau pour stocker les étoiles et les états de collapse et d'expanse
    let stars = [],
        collapse = false,
        expanse = false;

    // Crée un élément <canvas> et l'ajoute à l'élément
    let canvas = document.createElement("canvas");
    canvas.width = cw;
    canvas.height = ch;
    element.appendChild(canvas);

    // Récupère le contexte 2D du canvas
    let context = canvas.getContext("2d");
    context.globalCompositeOperation = "multiply";

    // Fonction pour ajuster la résolution du canvas en fonction de la densité de pixels
    function setDPI(canvas, dpi) {
        // Ajuste les dimensions CSS du canvas pour l'affichage
        if (!canvas.style.width)
            canvas.style.width = canvas.width + "px";
        if (!canvas.style.height)
            canvas.style.height = canvas.height + "px";

        // Calcul du facteur d'échelle en fonction de la densité de pixels
        let scaleFactor = dpi / 96;
        canvas.width = Math.ceil(canvas.width * scaleFactor);
        canvas.height = Math.ceil(canvas.height * scaleFactor);
        let ctx = canvas.getContext("2d");
        ctx.scale(scaleFactor, scaleFactor);
    }

    // Fonction pour effectuer une rotation autour d'un point
    function rotate(cx, cy, x, y, angle) {
        let radians = angle,
            cos = Math.cos(radians),
            sin = Math.sin(radians),
            nx = cos * (x - cx) + sin * (y - cy) + cx,
            ny = cos * (y - cy) - sin * (x - cx) + cy;
        return [nx, ny];
    }

    // Ajuste la résolution du canvas en fonction de la densité de pixels
    setDPI(canvas, 192);

    // Définition de la classe Star
    function Star() {
        // Génère des positions orbitales aléatoires
        let rands = [
            Math.random() * (maxorbit / 2) + 1,
            Math.random() * (maxorbit / 2) + maxorbit,
        ];

        // Calcul de la position orbitale moyenne
        this.orbital = rands.reduce(function (p, c) {
            return p + c;
        }, 0) / rands.length;

        // Position de départ au centre
        this.x = centerx;
        this.y = centery + this.orbital;

        // Position d'origine pour le suivi du mouvement
        this.yOrigin = centery + this.orbital;

        // Vitesse de rotation et angle initial
        this.speed = (Math.floor(Math.random() * 2.5) + 1.5) * Math.PI / 180;
        this.rotation = 0;
        this.startRotation = (Math.floor(Math.random() * 360) + 1) * Math.PI / 180;

        // Identifiant pour expansion future
        this.id = stars.length;

        // Bonus pour le mouvement sur survol
        this.collapseBonus = this.orbital - maxorbit * 0.7;
        if (this.collapseBonus < 0) {
            this.collapseBonus = 0;
        }

        // Ajout de l'étoile au tableau
        stars.push(this);

        // Couleur de l'étoile en fonction de la position orbitale
        this.color = "rgba(255,255,255," + (1 - this.orbital / 255) + ")";

        // Position sur survol et expansion
        this.hoverPos = centery + maxorbit / 2 + this.collapseBonus;
        this.expansePos =
            centery +
            (this.id % 100) * -10 +
            (Math.floor(Math.random() * 20) + 1);

        // Position précédente pour le suivi du mouvement
        this.prevR = this.startRotation;
        this.prevX = this.x;
        this.prevY = this.y;
    }

    // Méthode de dessin pour chaque étoile
    Star.prototype.draw = function () {
        if (!expanse) {
            this.rotation = this.startRotation + currentTime * this.speed;
            if (!collapse) {
                if (this.y > this.yOrigin) {
                    this.y -= 2.5;
                }
                if (this.y < this.yOrigin - 4) {
                    this.y += (this.yOrigin - this.y) / 10;
                }
            } else {
                this.trail = 1;
                if (this.y > this.hoverPos) {
                    this.y -= (this.hoverPos - this.y) / -5;
                }
                if (this.y < this.hoverPos - 4) {
                    this.y += 2.5;
                }
            }
        } else {
            this.rotation = this.startRotation + currentTime * (this.speed / 2);
            if (this.y > this.expansePos) {
                this.y -=
                    Math.floor(this.expansePos - this.y) / -140;
            }
        }

        context.save();
        context.fillStyle = this.color;
        context.strokeStyle = this.color;
        context.beginPath();
        let oldPos = rotate(
            centerx,
            centery,
            this.prevX,
            this.prevY,
            -this.prevR
        );
        context.moveTo(oldPos[0], oldPos[1]);
        context.translate(centerx, centery);
        context.rotate(this.rotation);
        context.translate(-centerx, -centery);
        context.lineTo(this.x, this.y);
        context.stroke();
        context.restore();

        this.prevR = this.rotation;
        this.prevX = this.x;
        this.prevY = this.y;
    };

    // Gestionnaire d'événement pour le clic sur l'élément
    element.addEventListener("click", function () {
        collapse = false;
        expanse = true;
        element.classList.add("open");
        document.querySelector(".fullpage").classList.add("open");
        setTimeout(function () {
            document.querySelector(".header .welcome").classList.remove("gone");
        }, 500);
    });

    // Gestionnaire d'événement pour le survol de l'élément
    element.addEventListener("mouseover", function () {
        if (expanse === false) {
            collapse = true;
        }
    });

    // Gestionnaire d'événement pour le retrait du survol de l'élément
    element.addEventListener("mouseout", function () {
        if (expanse === false) {
            collapse = false;
        }
    });

    // Boucle d'animation
    function loop() {
        let now = new Date().getTime();
        currentTime = (now - startTime) / 50;

        context.fillStyle = "rgba(25,25,25,0.2)";
        context.fillRect(0, 0, cw, ch);

        for (let i = 0; i < stars.length; i++) {
            if (stars[i] !== stars) {
                stars[i].draw();
            }
        }

        requestAnimationFrame(loop);
    }

    // Initialisation de l'animation
    function init(time) {
        context.fillStyle = "rgba(25,25,25,1)";
        context.fillRect(0, 0, cw, ch);
        for (let i = 0; i < 2500; i++) {
            new Star();
        }
        loop();
    }
    init();
}




