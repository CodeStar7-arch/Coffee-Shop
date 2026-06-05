import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const presets = {
    fadeUp: { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } },
    fadeDown: { hidden: { opacity: 0, y: -40 }, visible: { opacity: 1, y: 0 } },
    fadeLeft: { hidden: { opacity: 0, y: -60 }, visible: { opacity: 1, x: 0 } },
    fadeRight: { hidden: { opacity: 0, y: 60 }, visible: { opacity: 1, x: 0 } },
    fadeIn: { hidden: { opacity: 0, }, visible: { opacity: 1 } },
    scaleUp: { hidden: { opacity: 0, scale: 0.85 }, visible: { opacity: 1, scale: 1 } },
    slideUp: { hidden: { opacity: 0, y: 80 }, visible: { opacity: 1, y: 0 } }
};

export default function ScrollReveal({
    children,
    animation = 
})

const ref = useRef(null);
const isInView = useInView(ref, { once, amount });
const preset = presets[animation] || presets.fadeUp;

const Component = motion.create(as);

return (
    <Component
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={preset}
        transition={}
)

const ref = useRef(null);
const isInView = useInView(ref, { once, amount });

return (
    <motion.div
    ref={ref}
    initial="hidden"
    animate={isInView ? "visible" : "hidden"}
    variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } }
    }}
    classname
    >

    </motion.div>
)