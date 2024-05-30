/* eslint-disable @next/next/no-img-element */
import localFont from "next/font/local";
import Image from "next/image";

// Define props interface
interface CardProps {
  imgUrl: string;
  title: string;
  description: string;
  tags?: string[];
  i?: number;
}

const Card: React.FC<CardProps> = ({ imgUrl, title, description, tags, i }) => {
  return (
    <div
      className={`flex flex-col gap-y-6 items-center justify-start bg-white rounded-[10px] overflow-hidden h-[400px] sm:h-[450px] lg:h-[500px] w-[315px] lg:w-[420px] mx-auto text-[#2C2C2C] px-4 lg:px-8 pt-8 sm:pt-9`}
    >
      {/* <Image
        src="/why_slider.png"
        alt="photo"
        width={1200}
        height={1200}
        className=" w-16 sm:w-20 lg:w-24 h-16 sm:h-20 lg:h-24 object-contain rounded-[10px] "
      /> */}
      <div className=" w-[100px] h-[100px] rounded-[10px] bg-orange-400 mx-auto "></div>
      <span className=" text-3xl sm:text-[32px] font-semibold text-center w-full ">
        {title}
      </span>
      <p className=" text-base lg:text-[20px] font-medium leading-[26px] lg:!leading-[34px] text-[#2C2C2C]/80 tracking-wide ">
        {description}
      </p>
      <p className=" text-lg lg:text-xl font-medium sm:!leading-[34px] bg-[#DDFC9D] rounded-[5px] py-2 px-3">
        Past internships in Data Science or Machine Learning
      </p>
    </div>
  );
};

export default Card;
