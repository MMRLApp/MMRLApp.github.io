export default {
  async load() {
    return (await fetch("https://api.github.com/repos/MMRLApp/MMRL/releases")).json();
  },
};
