import profilePhoto from './IMG-20240605-WA0051.jpg'
import { profile } from './profile'

/* En-tête éditorial (composition « lab. ») — conservé ici pour
   pouvoir revenir dessus : l'en-tête actif est HeroBlob. */

export default function HeroEditorial() {
  return (
    <section className="open" id="open">
      {/* bande grise du bas, sur laquelle la photo se poursuit */}
      <span className="open-band" aria-hidden="true" />

      <div className="open-media">
        <img src={profilePhoto} alt="Portrait d'OKOUMASSOU Kodjo K." />
      </div>

      {/* légende technique en deux colonnes serrées */}
      <div className="open-caption">
        <span className="open-caption-label">Skwiz</span>
        <p>
          Étudiant en Licence 3 Intelligence Artificielle &amp; Big Data.
          Fondateur et CEO de Cliver.
        </p>
        <p>
          Modèles de prédiction, pipelines de données et applications
          mobiles menées jusqu'à la mise en ligne.
        </p>
      </div>

      {/* texte vertical, dans la bande claire à droite de la photo */}
      <span className="open-edge" aria-hidden="true">
        Okoumassou Kodjo K.
        <i>IA &amp; Big Data</i>
        <i>Portfolio 2026</i>
      </span>

      <h1 className="open-word">
        <span>skwiz<em>.</em></span>
      </h1>

      <div className="open-foot">
        <span className="open-index" aria-hidden="true">001</span>
        <a className="open-next" href="#intro" aria-label="Descendre">
          <span aria-hidden="true">→</span>
        </a>
        <div className="open-social">
          <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={`mailto:${profile.email}`}>Email</a>
        </div>
      </div>
    </section>
  )
}
