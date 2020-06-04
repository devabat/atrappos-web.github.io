import ReactGA from 'react-ga';

export  const mapEvent =(e, cls)=> {
    // eslint-disable-next-line
    var e = document.createEvent('Event');
    e.initEvent('click', true, true);
    var cb = document.getElementsByClassName(cls);
    return !cb[0].dispatchEvent(e);
};

export function sendGaEvent (obj) {
    ReactGA.event(obj)
}