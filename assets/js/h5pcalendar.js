const elPubli = document.getElementById('h5p-publications');
const optionsPubli = {
  h5pJsonPath:  'assets/h5p/data/calendar/publications',
  frameJs: 'assets/h5p/frame.bundle.js',
  frameCss: 'assets/h5p/styles/h5p.css',
}
new H5PStandalone.H5P(elPubli, optionsPubli);
