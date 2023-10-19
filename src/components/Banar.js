"use client";
import React, { useEffect } from "react";
import { Carousel } from "antd";

import { useGetAllBanarsQuery } from "@/redux/features/banar/banarApi";
import Image from "next/image";
import { setToLocalStorage } from "@/utils/local-storage";
import { useRouter } from "next/navigation";

const Banar = ({ token }) => {
  const { data, isLoading } = useGetAllBanarsQuery();
  const router = useRouter();

  useEffect(() => {
    if (token) {
      setToLocalStorage("accessToken", token);
      router.push("/");
    }
  }, [token, router]);

  return (
    <Carousel autoplay={true}>
      {isLoading ? (
        <div className="p-6">
          <div className="animate-pulse ">
            <div className="flex-1 py-2 space-y-3">
              <div className=" h-[500px] w-full rounded bg-gray-300"></div>
            </div>
          </div>
        </div>
      ) : (
        data?.data?.map((item, i) => (
          <div key={i} className="relative h-full md:h-[500px] lg:h-[700px]">
            <Image
              src={item?.secure_url}
              className="w-full h-full object-cover"
              alt={"banar"}
              width={1000}
              height={500}
              layout="responsive"
            />
          </div>
        ))
      )}
      {}
    </Carousel>
  );
};

export default Banar;
