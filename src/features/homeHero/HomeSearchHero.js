import ExplorerSearch from '../../components/ExplorerSearch';
import { SearchIcon } from '../../components/icons';
import TrackBackground from './TrackBackground';
import './homeHero.css';

function HomeSearchHero() {
  return (
    <section className="home-search-hero" aria-labelledby="home-hero-title">
      <TrackBackground />
      <div className="home-search-hero__content" id="home-hero-copy">
        <h1 id="home-hero-title">Explore Sepolia in real time.</h1>
        <p>Search any block, transaction, or address instantly.</p>
        <ExplorerSearch
          id="hero-explorer-search"
          variant="plain-hero"
          placeholder="Search block, tx hash, or address"
          buttonIcon={SearchIcon}
          submitPresentation="icon-only"
        />
      </div>
    </section>
  );
}

export default HomeSearchHero;
