import { useState, useRef, useEffect } from "react"



export default function SmoothiePage() {
  const foods = [
    {
      banner: "/smoothies/smoothie1.png",
      title: "Fruit Blend Storm",
      bg_color: "rgb(154, 34, 81)",
      explanation: "The perfect harmony of black mulberries and walnuts... Have you tried the smoothie bowl with fresh walnuts and sour black mulberries?"
    },
    {
      banner: "/smoothies/smoothie2.png",
      title: "Almond Storm",
      bg_color: "rgb(90, 77, 171)",
      explanation: "The meeting of almonds and yoghurt... Smoothie bowl with chocolate chips and blackberry.Have you ever tried it?"
    },
    {
      banner: "/smoothies/smoothie3.png",
      title: "Banana Therapy",
      bg_color: "rgb(108, 61, 41)",
      explanation: "The meeting of banana and yoghurt... Smoothie bowl with chocolate chips and blackberries. Have you ever tried it?"
    },
    {
      banner: "/smoothies/smoothie5.png",
      title: "Blueberry Therapy",
      bg_color: "rgb(33, 108, 185)",
      explanation: "The meeting of blueberries and yoghurt... Smoothie bowl with blue pearls and strawberries. Have you ever tried it?"
    },
    {
      banner: "/smoothies/smoothie6.png",
      title: "Blueberry Storm",
      bg_color: "rgb(120, 80, 149)",
      explanation: "The meeting of blueberries and yoghurt... Smoothie bowl with coconut and yoghurt. Have you ever tried it?"
    },
    {
      banner: "/smoothies/smoothie7.png",
      title: "Pearl Dream",
      bg_color: "rgb(76, 3, 40)",
      explanation: "The meeting of blackberries and yoghurt... Smoothie bowl with coconut and purple pearls. Have you ever tried it?"
    },

    {
      banner: "/smoothies/smoothie9.png",
      title: "Creamy Balls",
      bg_color: "rgb(7, 128, 118)",
      explanation: "Meeting of cream balls and yoghurt... Smoothie bowl decorated with coconut and cream balls. Have you ever tried it?"
    },
    {
      banner: "/smoothies/smoothie10.png",
      title: "Strawberry Dream",
      bg_color: "rgb(154, 34, 81)",
      explanation: "The meeting of vanilla balls and yoghurt... Smoothie bowl decorated with strawberries and blackberries. Have you ever tried?"
    }

  ]
  const [imageIndex, setImageIndex] = useState(0)
  const [anim, setAnim] = useState(false)
  const [freeze, setFreeze] = useState(false)
  const imageRef = useRef(null);



  useEffect(() => {
    let currentIndex = 0;
    const handleScroll = () => {
      if (Number.isInteger(imageRef.current.scrollLeft / imageRef.current.offsetWidth) && (imageRef.current.scrollLeft / imageRef.current.offsetWidth) !== currentIndex) {
        setAnim(true)
        setFreeze(true)
        setTimeout(() => {
          setImageIndex(imageRef.current.scrollLeft / imageRef.current.offsetWidth);
          currentIndex = imageRef.current.scrollLeft / imageRef.current.offsetWidth
          setAnim(false)
          setFreeze(false)
        }, 500);
      }
    };

    if (imageRef.current) {
      imageRef.current.addEventListener("scroll", handleScroll);
    }

  }, [])

  const next = () => {

    if (imageRef.current) {
      imageRef.current.scrollTo({
        left: imageRef.current.scrollLeft + imageRef.current.offsetWidth,
        behavior: "smooth"
      })
    }


  }


  const back = () => {

    if (imageRef.current) {
      imageRef.current.scrollTo({
        left: imageRef.current.scrollLeft - imageRef.current.offsetWidth,
        behavior: "smooth"
      })
    }

  }


  return (
    <div className="h-[100dvh] w-screen relative justify-between lg:flex-row flex flex-col-reverse overflow-hidden"
      style={{
        backgroundColor: foods[imageIndex]?.bg_color
      }}
    >

      <div className="lg:w-[28%] break-word my-auto lg:h-full lg:ml-24 p-7 lg:p-0 flex flex-col">
        <div className="hidden lg:pt-20 lg:flex justify-center  text-white/50 lg:text-xl xl:gap-32 gap-10">
          <span className="">MENU</span>
          <span>SMOOTHIES</span>
          <span>ABOUT</span>
        </div>
        <div className="flex-col flex-1 flex lg:gap-16 gap-6 justify-between py-24">
          <div className="flex flex-col gap-10">
            <span
              className={`lg:text-8xl text-5xl text-[#ffffff75] text-center lg:text-left font-semibold drop-shadow-2xl${anim ? " textAnimBack" : " textAnimNext"}`}
            >
              {foods[imageIndex]?.title}
            </span>
            <span
              className={`text-white/40 lg:text-xl text-center lg:text-left  drop-shadow-2xl${anim ? " textAnimBack" : " textAnimNext"}`}
            >
              {foods[imageIndex]?.explanation}
            </span>
          </div>
          <button className="text-white/50 bg-[#0b0a0b54] py-4 rounded-xl">Customize Your Order</button>

        </div>
      </div>
      <div ref={imageRef} className={`scrollTransparent lg:shadow-[#13121252] max-h-2/5 lg:h-full snap-mandatory snap-x shadow-xl overflow-hidden flex  items-center lg:w-[50%] bg-[#ffffff42] lg:rounded-l-full${freeze ? " overflow-x-hidden" : " overflow-x-auto"}`}>
        {
          foods.map((food, index) => <div key={index} className="w-full snap-center snap-always	 flex shrink-0 justify-center items-center">
            < img className={`sm:h-[550px] aspect-square p-20 lg:p-0 object-contain imageAnim`} src={food.banner} alt="" />
          </div>)
        }
      </div>
      <div className="absolute hidden lg:flex  bottom-20 w-40 h-10 right-24 gap-3">
        <div onClick={back} className="w-1/2 rounded-xl bg-[#211E1E]/30 flex items-center justify-center">
          <i className="text-xl text-white/60 fa-solid fa-angle-up fa-rotate-270"></i>
        </div>
        <div onClick={next} className="w-1/2 rounded-xl bg-[#211E1E]/30 flex items-center justify-center">
          <i className="text-xl text-white/60 fa-solid fa-angle-up fa-rotate-90"></i>
        </div>
      </div>
    </div>
  )
}