const elementCentralizer = document.getElementById("centralizer");
const elementCentralizerText = document.getElementById("centralizerText");
const elementCloud = document.getElementById("cloud");
const elementCloudText = document.getElementById("cloudText");

const serviceVerify = () => {
    checkServices();
}

const checkServices = async () => {
    var headers = new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    });
    var init = { 
            method: 'GET',
            headers: headers
    };
    var host = window.location.host;
    await fetch('http://' + host + ':8000/monitor', init).then(response => response.json())
    .then(data => {
      if(data.local_centralizer){
        elementCentralizer.className = "online";
        elementCentralizerText.innerHTML = "Online";
      }else{
        elementCentralizer.className = "offline";
        elementCentralizerText.innerHTML = "Offline";
      }
      if(data.harpia_cloud){
        elementCloud.className = "online";
        elementCloudText.innerHTML = "Online";
      }else{
        elementCloud.className = "offline";
        elementCloudText.innerHTML = "Offline";
      }
    })
    .catch(function(error) {
        elementCentralizer.className = "offline";
        elementCentralizerText.innerHTML = "offline";
        elementCloud.className = "offline";
        elementCloudText.innerHTML = "Offline";
        console.log('There has been a problem with your fetch operation: ' + error.message);
    });
    setTimeout(serviceVerify(), 30000);
}

serviceVerify()