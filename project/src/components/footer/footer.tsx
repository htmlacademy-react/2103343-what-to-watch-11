import Logo from '../../components/logo/logo';

export default function FooterScreen(): JSX.Element{
  return (
    <footer className="page-footer">

      <Logo isLight />

      <div className="copyright">
        <p>© 2019 What to watch Ltd.</p>
      </div>
    </footer>
  );
}
