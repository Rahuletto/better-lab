import {
  FaCopyright,
  FaGolang,
  FaJava,
  FaJs,
  FaPython,
  FaRust,
  FaSwift,
} from 'react-icons/fa6';
import {
  SiCplusplus,
  SiCsharp,
  SiHaskell,
  SiJulia,
  SiLua,
  SiPerl,
  SiPhp,
  SiR,
  SiRuby,
  SiTypescript,
} from 'react-icons/si';

export default function IconMaker({ lang }: { lang: string }) {
  // @ts-ignore
  return <h2>{iconMap[lang]}</h2>;
}

const iconMap = {
  C: <FaCopyright />,
  CPP: <SiCplusplus />,
  CSHARP: <SiCsharp />,
  GO: <FaGolang />,
  JULIA: <SiJulia />,
  PERL: <SiPerl />,
  HASKELL: <SiHaskell />,
  PYTHON: <FaPython />,
  JAVA: <FaJava />,
  JAVASCRIPT: <FaJs />,
  LUA: <SiLua />,
  PHP: <SiPhp />,
  RUBY: <SiRuby />,
  R: <SiR />,
  RUST: <FaRust />,
  SWIFT: <FaSwift />,
  TYPESCRIPT: <SiTypescript />,
};
