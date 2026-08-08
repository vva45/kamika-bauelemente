# Catálogos de proveedor, sin tratar

Los PDF tal y como los manda el proveedor. **No se publican**: esta
carpeta está fuera de `public/`, así que Next no la sirve y nadie puede
descargarla desde la web.

Es a propósito. Estos ficheros llevan todavía el logotipo del
fabricante, su dirección, su teléfono y los códigos QR que llevan a su
configurador. Publicarlos sería mandarle el cliente a mitad de camino
—el mismo motivo por el que existe `scripts/prepare_drutex.py`, que es
quien los deja publicables.

## Cómo se usan

```bash
python3 scripts/prepare_drutex.py      # de aquí a public/pdf/catalogues/
python3 scripts/extract_drutex_models.py
```

El primero limpia y escribe el PDF publicable más su portada; el segundo
saca los modelos y sus imágenes. Si el proveedor manda una versión
nueva, se sustituye el fichero **aquí** y se vuelven a ejecutar los dos,
por ese orden. Nunca al revés: un PDF ya limpio pasado otra vez por el
script se le redactaría encima.

Los dos catálogos de persianas anteriores no están aquí porque se
limpiaron en su día sobre el propio fichero; de esos no queda original.
