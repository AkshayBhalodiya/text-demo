import Link from "next/link";
// import '../styles/styles.scss';

const Home: React.FC = () => {
  return (
    <nav className="navbar">
    <div className="navbar-brand pb-4">Application</div>
    <ul className="navbar-nav">
      <li className="nav-item">
        <Link href="/" className="active">
          <span className="nav-link">Homepage</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link href="/center-a-div">
          <span className="nav-link">Exercise One: Center a Div</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link href="/table">
          <span className="nav-link">Exercise Two: Table</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link href="/javascript">
          <span className="nav-link">Exercise Three: JavaScript</span>
        </Link>
      </li>
    </ul>
  </nav>
  );
};

export default Home;
