# NOTES — Startup Intelligence Feed

## Decisiones de diseño

**Conviction score como barra horizontal + número tabular, con 3 tiers sutiles.
Evalué ring, heatbar y dot-pattern. La barra gana para esta UX porque el caso
de uso dominante es escaneo rápido: un analista recorre 30 cards comparando
scores de un vistazo. La barra permite lectura relativa (¿más larga que la
anterior?) y absoluta (número) en el mismo eje visual, sin consumir espacio
vertical. El anillo dificulta la comparación entre elementos adyacentes; el
heatbar introduce demasiado color y ruido en una lista que ya contiene tags,
país, stage y trend. Añadí tres tiers (<60, 60–79, 80+) usando variaciones
de gris en lugar de un espectro de color: ayuda al triaje sin sesgar la lectura.

**Paleta restringida a 3 acentos semánticos.
Trend up/down/neutral son los únicos elementos con color en la card principal.
Los tipos de signal (team / market / traction / product) usan color únicamente
dentro del breakdown expandido, nunca en estado colapsado. El resto opera en
escala de grises. La premisa del brief — bajo ruido visual en una herramienta
de trabajo — guía esta decisión.

**Jerarquía de la card: identidad → contexto → narrativa → señales → acción.
Nombre + trend arriba (quién es, hacia dónde va), metadata en una línea
(stage · país · año), descripción limitada a 3 líneas, tags de sector,
conviction score como ancla visual, y footer con funding + toggle de señales.
El breakdown aparece al expandir sin reordenar la card. El score actúa como
punto de gravedad; el resto aporta contexto.

**CSS Modules + variables CSS, sin Tailwind.
Opté por CSS Modules para mantener encapsulación real por componente y evitar
densidad innecesaria en JSX. Las decisiones de diseño (spacing, color, radius)
viven en tokens centralizados, lo que permite consistencia sin sacrificar
legibilidad en los diffs.

**Zustand para UI state, React Query para server state.
Zustand gestiona filtros, búsqueda (input controlado) y sort. React Query
maneja el fetch y cacheo con queryKey: ["startups", filters] y
placeholderData para evitar flashes de loading al cambiar filtros. El
skeleton aparece solo en la carga inicial. La búsqueda aplica debounce (250ms)
antes de disparar el query. No hay solapamiento de responsabilidades: cada
herramienta resuelve lo suyo.

**StartupCard como componente puro.
Recibe { startup, index } por props, sin dependencia del store. El index
solo controla el stagger de animación (limitado para evitar latencia
percibida). El estado de expansión es local. Esto facilita testeo y reutilización.

**Animación de entrada sutil + prefers-reduced-motion.
Un translateY(6px) + opacity con stagger comunica cambios en el feed sin
ser intrusivo. Está limitado a los primeros elementos y desactivado para
usuarios que prefieren menos movimiento.

**Sin librerías externas de íconos.
El set es mínimo (trends, chevron, search, close), así que los implementé en
SVG inline. Esto elimina dependencias y mantiene consistencia visual. Escalaría
a una librería si el set creciera significativamente.

**Qué decidí NO construir y por qué
URL query params.
Útiles para compartir vistas, pero implican sincronización bidireccional
(URL ↔ estado) con complejidad adicional. Para este caso, el estado se
reconstruye rápidamente, así que el ROI es bajo.
Virtualización.
El volumen de datos no lo justifica. Premature optimization.
Keyboard navigation completa en MultiSelect.
Hay soporte básico accesible, pero no navegación avanzada con roving focus.
Es un gap consciente si el producto evoluciona a uso intensivo de teclado.
Pitch deck link.
El tipo existe, pero no hay datos en el mock. Evité UI para un caso inexistente.
Sticky filter bar.
No aporta valor con el volumen actual.
Métricas agregadas en el header.
Desvían el foco de la decisión principal: evaluar startups individuales.
Error UI compleja.
Implementé un estado base con retry. Invertir más no aportaba valor real
en este contexto.
Inconsistencias y rarezas que noté
stp_05 Raíz Logistics tiene un weight: 1.05, fuera del rango esperado.
Visualmente se clamp a 100%, pero se muestra el valor real. La UI no debería
ocultar inconsistencias del dato.
stp_17 Íntegra tiene foundedYear: 2027.
Probablemente intencional (startup en stealth). No se fuerza corrección.
stp_17 no tiene signals.
Se oculta el toggle de expansión en ese caso.
stp_07 Aulabit no tiene funding.
Se muestra como “Funding sin revelar” de forma discreta.
Issue en tsc -b.
Conflicto entre composite y noEmit. No afecta ejecución ni build con Vite.
Lo dejo documentado porque impacta DX.
Qué haría con más tiempo
Sync de estado con URL
Skeleton dinámico basado en último resultado
Persistencia de sort por tipo
Tooltips para país
Integration test del flujo completo
Dark mode (tokens ya preparados)
Vista expandida en panel lateral
Colaboración con IA

**Utilicé IA como soporte puntual en revisión y refinamiento: validación de
decisiones de UX, optimización de estilos y contraste de alternativas
(especialmente en la representación del conviction score). También ayudó a
detectar edge cases y a cuestionar decisiones para asegurar que estuvieran
bien fundamentadas.

Las decisiones de arquitectura, separación de responsabilidades, alcance del
feature set y trade-offs de producto fueron deliberadas y tomadas de forma
consciente. La IA funcionó como una segunda opinión técnica, no como origen
de las soluciones.

En algunos casos concretos incorporé sugerencias útiles — por ejemplo, el uso
de tiers sutiles en la barra de conviction para mejorar el triaje sin introducir
ruido visual — siempre filtradas bajo el criterio de mantener coherencia con
el objetivo principal: velocidad de escaneo y bajo ruido.