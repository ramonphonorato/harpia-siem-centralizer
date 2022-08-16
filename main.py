from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import subprocess
import telnetlib
from pydantic import BaseModel

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def raiz():
    return {"Harpia": "Centralizer"}


@app.get("/monitor")
def monitor():
    try:
        local_port = subprocess.check_output("netstat -plnut -l | grep 5044",
                                         shell=True)
        local_port = True

    except subprocess.CalledProcessError as e:
        local_port = False

    try:
        tn = telnetlib.Telnet("central-lb-logstash.harpiasiem.com.br", 5046, 5)
        tn.read_until(b">", timeout=5)  # <- add this line
        # tn.read_until(b"> ", timeout=10) # if prompt has space behind
        cloud_port = 'Connection established'
        tn.write(b"exit\n")
        cloud_port = True

    except Exception:
        cloud_port = False

    return{
        "local_centralizer": local_port,
        "harpia_cloud": cloud_port
    }
