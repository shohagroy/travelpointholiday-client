"use client";

import BreadcrumbBanar from "@/components/ui/BreadcrumbBanar";
import ReviewCard from "@/components/ui/ReviewCard";
import { useGetUserReviewsQuery } from "@/redux/features/review/reviewApi";
import { loginUser } from "@/utils/LoginUser";
import { Button, Card, Flex } from "antd";
import Head from "next/head";
import React from "react";

const ReviewPage = () => {
  const userId = loginUser().id;
  const { data, isLoading } = useGetUserReviewsQuery({ id: userId });

  return (
    <>
      <Head>
        <title>Travel Point | Reviews</title>
      </Head>

      <main>
        <BreadcrumbBanar
          name={"My Reviews"}
          tittle={"My Reviews"}
          breadItems={[{ title: "Reviews" }]}
        />
        <section className=" max-w-7xl mx-auto my-10 ">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {data?.data?.map((item, i) => (
              <div key={i}>
                <ReviewCard data={item} />
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default ReviewPage;
