import profilImg from "../../assets/profil/ProfilImg";

const teamMembers = [
  {
    firstName: "Nicolas",
    lastName: "CORROYEZ",
    role: "Scrum Master",
    description:
      "Il a dirigé la maison blanche, malin intelligent et dangereux, il est la cible parfaite des autres groupes d'apo !",
    photo: (
      <img
        src={profilImg.nikolai}
        alt="nikolai_image"
        className="rounded-full"
      />
    ),
  },
  {
    firstName: "Réda",
    lastName: "KERDJADJ",
    role: "Lead dev back",
    description:
      "Il aime bien la sécurité avant tout, il cherche à dépasser Benjamin sur l'utilisation du JWT et a t-il laissé tombé ThreeJS ?",
    photo: (
      <img src={profilImg.reda} alt="Réda_image" className="rounded-full" />
    ),
  },
  {
    firstName: "Jade",
    lastName: "SIMON",
    role: "Product Owner",
    description:
      "Sur les pas d'Einstein, 144 de QI si ce n'est plus ! Son cerveau quantique lui a permi de faire une requete SQL de 90 lignes",
    photo: (
      <img src={profilImg.jade} alt="Jade_image" className="rounded-full" />
    ),
  },

  {
    firstName: "Nicolas",
    lastName: "EVEZARD",
    role: "Git Master",
    description:
      "Nicolas il aime bien le nutela de 1kg, tout ce sucre lui a permi d'apprendre Github en une nuit. Un vrai de vrai !",
    photo: (
      <img src={profilImg.reda} alt="Nicolas_image" className="rounded-full" />
    ),
  },
  {
    firstName: "Tarek",
    lastName: "AIT-AYAD",
    role: "Lead dev front",
    description:
      "Le ninja de warzazat ! Il a quitté la France pour coder dans l'ombre, il est rapide et ses visuels se vendent cher sur le marcher !",
    photo: (
      <img src={profilImg.tarek} alt="Tarek_image" className="rounded-full" />
    ),
  },
];

export default function About() {
  return (
    <div className="flex justify-center items-center lg:flex-wrap ml-3 mr-3">
      <div className="lg:flex gap-10">
        {teamMembers.map((member, index) => (
          <div key={index} className=" lg:w-[30%] grid gap-3 mb-2">
            <div className=" hover:bg-white hover:text-black p-6 rounded-lg">
              {/* Photo */}
              <div className="w-20 h-20 bg-purple-300 rounded-full mb-4 mx-auto">
                {member.photo}
              </div>

              {/* Nom, prénom et rôle */}
              <div className="text-center font-semibold mb-2">
                {member.firstName} {member.lastName}
              </div>
              <div className="text-center  mb-4">{member.role}</div>

              {/* Description */}
              <div className="text-center ">{member.description}</div>
            </div>
            <div className="divider before:bg-primary after:bg-secondary lg:hidden"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
