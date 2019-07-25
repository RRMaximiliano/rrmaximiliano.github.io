---
layout: post
title: "Errores comúnes en las visualizaciones del Nuevo Diario"
author: "Rony Rodriguez-Ramirez"
date: "2019-07-26"
excerpt: ""
tags: [Nicaragua, datos, visualizaciones]
comments: true
---

Un punto importante en el análisis de datos es visualización. Dado que muchas veces resulta difícil conocer realmente lo que sucede sobre x evento, es necesario recurrir a figuras que en la mayoría de las ocasiones describen y expresar mejor un mensaje en comparación con palabras. Sin embargo, la visualización de datos no es algo simple y, a su vez, existen elementos necesarios para poder conllevar un mensaje claro.

Ayer apareció un [artículo](https://www.elnuevodiario.com.ni/economia/497166-pib-per-capita-nicaragua-centroamerica/) en el **Nuevo Diario** que tenía como objetivo compartir un mensaje sobre los niveles del Producto Interno Bruto (PIB) per cápita en Nicaragua en comparación con los demás países de Centroamérica. No obstante, el artículo presenta varios problemas los cuales se pueden solucionar.

## Problemas con el artículo del Nuevo Diario
Omitiendo un poco la redacción del artículo y centrándonos solamente en las visualización podemos dividir los errores en dos: (1) información relevante, y (2) estética.

La primera figura es sobre el PIB per cápita en Centroamérica y presenta un mapa al lado izquierdo y un gráfico de barras en el derecho.

![Fig 1](/assets/post-images/pib-ca.jpg)

Realmente no hay ningún problema en presentar nos figuras dentro de la misma infografía pero hay que poner atención a los detalles que se van a incluir. En términos de información relevante se dan las siguientes errores:

1. **Datos**: Los datos que utiliza la gráfica tiene dos elementos que hacen que la figura sea difícil de leer.
   (a). No todos los años son consistentes.  La comparación que hacen es tomando como base el año en que los países tenían ingresos similares al que tiene Nicaragua ahora. Esto conlleva que países como Costa Rica tengan datos para 1992, Belize para 1989, etc. El año de referencia pudo ser 1990 para todos y así construir las diferencias.
2. **Fuente**: Ninguna de las figuras presenta fuente. En el cuerpo del texto se da a entender que los datos fueron tomados del Banco Mundial; sin embargo, esto debe ser incluído en la gráfica.
3. **Año base**: Un punto importante en economía es ver las diferencias en términos reales de las economía. En este caso, es necesario aislar los cambios que provienen solamente por el aumento de los precios. Lamentablemente los datos son presentan información sobre el tipo de indicador que se ocupa. Por ejemplo, si es pib per cápita real, nominal, o si está ajustado por paridad de poder adquisitivo.
4. **Escala del eje y**: La figura no tiene información sobre la dimensión del eje y. Hasta cierto punto, y con mi poca habilidad ocular, las barras no son proporcionales.
5. **Necesidad de un mapa**: El mapa realmente no aporta mucho a la conversación sobre el PIB per cápita de Centroamérica; no es de utilidad y solamente nos quita espacio.

Ahora, en términos de estética (aesthetics) se presentan los siguientes errores:

1. **Código de colores**: La infografía utiliza para el mapa un código de colores análogo al que se utiliza para el gráfico de barros. Sin embargo, no todos los países están visualizados en el la gráfica. Por ejemplo, se omite el PIB per cápita de Nicaragua.
2. **Conexión entre el mapa y los datos**: Por otro lado, para poder ubicar un país con su respectivo dato tenemos que movernos entre el mapa y el gráfico de barras. El gráfico de barras debería contener fácilmente algo que nos haga identificar que el color verde es de Panamá, el color celeste es de Costa Rica, y así sucesivamente.
3. **Paleta de colores**: La paleta utilizada en esta figura puede no ser la más idónea para personas con daltonismo. Para más información sobre estas el diseño universal de colores pueden visitar esta [página](https://jfly.uni-koeln.de/color/).

## ¿Cómo podríamos visualizar estos datos de una mejor manera?

> *Disclaimer*: Busqué en la base de datos del Banco Mundial, y ningún indicador de PIB per cápita tanto a nivel real, nominal, o ajustado por paridad de poder aquisitivo resultaba en los mismos datos que presenta el artículo del Nuevo Diario.

Siguiendo la idea comparativa entre un año base y el año actual retomada en el artículo del Nuevo Diarío, podríamos graficar el PIB per cápita de la siguiente forma: 

![Fig 2](/assets/post-images/pib-ca-fixed.png)

Esta figura contiene todos los elementos necesarios para poder expresar el mensaje del artículo del Nuevo Diario.

1. Título con información sobre el indicador.
2. Cada eje tiene una etiqueta que describe tanto países como indicador. Además, el eje X tiene formato en dólares.
3. Contiene información sobre la fuente y la persona realizó el gráfico.
4. Por último, compara la evolución de PIB en dos anos 1990 y 2018, y la información se encuentra ordenada de mayor a menor PIB per cápita en el año 2018.
