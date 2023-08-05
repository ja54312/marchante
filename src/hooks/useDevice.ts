//Librerias
import { useState, useEffect } from "react";
//MODELS
import { DEVICE } from "../../models/useDevice.model";

//Hook para traer tamaño de dispositivo

const useDevice = () => {
    const [device, setDevice] = useState<DEVICE>();
    const [anchoPantalla, setAnchoPantalla] = useState<number>(0);

    useEffect(() => {
        let item: number = window.innerWidth;
        setAnchoPantalla(item);
    }, []);

    useEffect(() => {
        window.addEventListener(
            "resize",
            function () {
                let item: number = window.innerWidth;
                setAnchoPantalla(item);
            },
            true
        );
    }, [anchoPantalla]);

    useEffect(() => {
        if (anchoPantalla < 767) {
            setDevice(DEVICE.PHONE);
        }
        if (766 < anchoPantalla && anchoPantalla < 905) {
            setDevice(DEVICE.TABLET);
        }
        if (anchoPantalla > 821) {
            setDevice(DEVICE.DESKTOP);
        }
    }, [anchoPantalla]);

    return { device };
};

export default useDevice;