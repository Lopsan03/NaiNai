import { motion } from 'motion/react';
import { Heart, Award, MapPin } from 'lucide-react';
import SectionHeading from '@/src/components/public/SectionHeading';

export default function SobreNosotros() {
  return (
    <div className="pt-32 pb-24 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="La Historia de NaiNai"
          subtitle="Nacimos con un propósito simple: crear los mejores brownies artesanales de Monterrey, Nuevo León."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl"
          >
            <img
              src="https://picsum.photos/seed/nainaistory/1200/900"
              alt="La cocina de NaiNai"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <p className="text-xl text-muted-foreground leading-relaxed">
              En NaiNai, creemos que los mejores momentos se comparten con algo dulce. Lo que comenzó como una pasión por hornear en casa se convirtió en una misión para perfeccionar la receta del brownie ideal.
            </p>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Cada uno de nuestros brownies es horneado diariamente en Monterrey, utilizando solo ingredientes de la más alta calidad. Nos enfocamos en la textura: ese contraste perfecto entre una capa superior crujiente y un centro suave y melcocho que te hace querer más.
            </p>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Somos orgullosamente regios y nos encanta ser parte de tus celebraciones, regalos y antojos diarios. ¡Gracias por dejarnos endulzar tu día!
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: Heart,
              title: "Pasión por Hornear",
              text: "Cada brownie es una obra de arte culinaria, hecha con dedicación y cuidado en cada paso del proceso.",
            },
            {
              icon: Award,
              title: "Calidad Premium",
              text: "No escatimamos en ingredientes. Usamos el mejor chocolate y mantequilla para garantizar un sabor superior.",
            },
            {
              icon: MapPin,
              title: "Orgullosamente Regia",
              text: "Nacimos y crecimos en Monterrey. Amamos nuestra ciudad y a nuestra comunidad.",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white p-10 rounded-3xl border border-border/50 text-center hover:shadow-xl transition-all"
            >
              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-8">
                <feature.icon className="w-10 h-10" />
              </div>
              <h3 className="font-heading font-bold text-2xl mb-4">{feature.title}</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">{feature.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
