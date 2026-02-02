"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Dish {
  id: string
  image: string
  label: string
  description: string
  rotation: number
  position: { top: string; left: string }
}

const dishes: Dish[] = [
  {
    id: "king",
    image: "/images/king.jpg",
    label: "King of Dishes",
    description: "Spicy Sesame Ribs - My signature!",
    rotation: -3,
    position: { top: "22%", left: "52%" },
  },
  {
    id: "sweet",
    image: "/images/sweet.jpg",
    label: "Sweet Treats",
    description: "Portuguese Egg Tarts - Golden perfection!",
    rotation: 4,
    position: { top: "58%", left: "72%" },
  },
  {
    id: "disaster",
    image: "/images/disaster.jpg",
    label: "Kitchen Disaster",
    description: "Pepper Stir-fry - Oops, too much wok hei!",
    rotation: -5,
    position: { top: "55%", left: "22%" },
  },
  {
    id: "daily",
    image: "/images/daily.jpg",
    label: "Daily Special",
    description: "Pork Belly Set - Comfort in a bowl!",
    rotation: 2,
    position: { top: "18%", left: "78%" },
  },
]

export default function FoodBlogLanding() {
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null)
  const [isRevealed, setIsRevealed] = useState(false)

  const handleDishClick = (dish: Dish) => {
    setSelectedDish(dish)
    setIsRevealed(false)
  }

  const handleReveal = () => {
    setIsRevealed(true)
  }

  const handleBackToCorkboard = () => {
    setSelectedDish(null)
    setIsRevealed(false)
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        {/* Corkboard View */}
        {!selectedDish && (
          <motion.div
            key="corkboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            {/* Corkboard Background */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('/images/corkboard.jpeg')`,
              }}
            />

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute top-4 left-1/2 -translate-x-1/2 z-20"
            >
              <h1 className="font-sans text-3xl md:text-4xl text-amber-900 bg-amber-50/90 px-6 py-3 rounded-lg shadow-lg border-2 border-amber-800/20 text-balance text-center">
                {"Badger's Kitchen"}
              </h1>
            </motion.div>

            {/* Polaroid Buttons */}
            {dishes.map((dish, index) => (
              <motion.button
                key={dish.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                onClick={() => handleDishClick(dish)}
                className="absolute cursor-pointer group"
                style={{
                  top: dish.position.top,
                  left: dish.position.left,
                  transform: `translate(-50%, -50%) rotate(${dish.rotation}deg)`,
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.08, rotate: 0 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-amber-50 p-2 md:p-3 shadow-xl transition-shadow group-hover:shadow-2xl"
                  style={{
                    boxShadow: "4px 4px 12px rgba(0,0,0,0.3)",
                  }}
                >
                  {/* Pin */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 md:w-5 md:h-5 rounded-full bg-red-500 shadow-md z-10 border-2 border-red-700" />

                  {/* Photo */}
                  <img
                    src={dish.image || "/placeholder.svg"}
                    alt={dish.label}
                    className="w-[100px] h-[100px] md:w-[130px] md:h-[130px] object-cover"
                  />

                  {/* Label */}
                  <p className="font-sans text-amber-900 text-sm md:text-base mt-2 text-center whitespace-nowrap">
                    {dish.label}
                  </p>
                </motion.div>
              </motion.button>
            ))}

            {/* Hint text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 font-sans text-amber-900/70 text-sm md:text-base bg-amber-50/80 px-4 py-2 rounded-full"
            >
              Click a photo to see the dish!
            </motion.p>
          </motion.div>
        )}

        {/* Badger Kitchen Scene */}
        {selectedDish && (
          <motion.div
            key="kitchen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <motion.div
              className="relative w-full h-full"
              animate={{
                scale: isRevealed ? 1.1 : 1,
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url('/images/background.jpeg')`,
                }}
              />

              {/* Speech Bubble */}
              <AnimatePresence>
                {!isRevealed && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="absolute top-[15%] left-1/2 -translate-x-1/2 z-20"
                  >
                    <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl px-6 py-4 shadow-lg border-2 border-amber-900/20">
                      <p className="font-sans text-xl md:text-2xl text-amber-900 text-center whitespace-nowrap">
                        {"Let me show you this one!"}
                      </p>
                      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[14px] border-t-white/95" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Cloche Container - positioned on the table (before reveal) */}
              <AnimatePresence>
                {!isRevealed && (
                  <>
                    {/* Back Button for unrevealed state */}
                    <motion.button
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                      onClick={handleBackToCorkboard}
                      className="absolute top-4 left-4 z-50 bg-amber-800 hover:bg-amber-900 text-white font-sans text-base px-5 py-2 rounded-full shadow-lg transition-colors cursor-pointer"
                    >
                      Back to Board
                    </motion.button>

                    <div className="absolute top-[68%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                      <motion.div
                        initial={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -150 }}
                        animate={{
                          y: [0, -8, 0],
                        }}
                        transition={{
                          y: {
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          },
                          opacity: { duration: 0.5 },
                        }}
                        onClick={handleReveal}
                        className="cursor-pointer hover:scale-105 transition-transform"
                      >
                        <img
                          src="/images/cloche.png"
                          alt="Cloche - Click to reveal"
                          className="w-[160px] md:w-[224px] h-auto drop-shadow-2xl"
                        />
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="text-center font-sans text-amber-900/80 text-sm mt-2"
                        >
                          Click to reveal!
                        </motion.p>
                      </motion.div>
                    </div>
                  </>
                )}
              </AnimatePresence>

              {/* Revealed Content - 3-section vertical Flexbox layout */}
              <AnimatePresence>
                {isRevealed && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="absolute inset-0 z-20 flex flex-col h-full"
                  >
                    {/* Top Bar - Back Button */}
                    <div className="flex-shrink-0 p-4">
                      <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                        onClick={handleBackToCorkboard}
                        className="bg-amber-800 hover:bg-amber-900 text-white font-sans text-base px-5 py-2 rounded-full shadow-lg transition-colors cursor-pointer"
                      >
                        Back to Board
                      </motion.button>
                    </div>

                    {/* Main Content Area - Centered with constrained height */}
                    <div className="flex-1 flex items-center justify-center px-4 min-h-0">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="max-h-[70vh]"
                      >
                        {/* Polaroid Frame */}
                        <div className="bg-white p-3 md:p-4 shadow-2xl rotate-[-2deg] flex flex-col">
                          <img
                            src={selectedDish.image || "/placeholder.svg"}
                            alt={selectedDish.label}
                            className="w-[240px] md:w-[300px] h-auto max-h-[45vh] object-cover"
                          />
                          <p className="font-sans text-center text-amber-900 text-base md:text-lg mt-3 pb-1">
                            {selectedDish.description}
                          </p>
                        </div>
                      </motion.div>
                    </div>

                    {/* Bottom Bar - Choose Another Dish Button */}
                    <div className="flex-shrink-0 p-4 pb-8 flex justify-center">
                      <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.6 }}
                        onClick={handleBackToCorkboard}
                        className="bg-amber-800 hover:bg-amber-900 text-white font-sans text-base md:text-lg px-6 md:px-8 py-2 md:py-3 rounded-full shadow-lg transition-colors cursor-pointer"
                      >
                        Choose Another Dish
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Decorative overlay gradient at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-amber-900/20 to-transparent pointer-events-none" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
