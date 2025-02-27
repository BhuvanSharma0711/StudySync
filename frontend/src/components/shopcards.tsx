import React from 'react'
import {Card, CardBody, CardFooter, Image} from "@heroui/react"

function Shopcards(props:any){
  return (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
      <Card isPressable shadow="sm" fullWidth={false} onPress={() => console.log("item pressed")}>
        <CardBody className="relative overflow-hidden p-0">
          <Image
              alt={props.shopname}
              className="w-full object-cover h-[140px]"
              radius="lg"
              shadow="sm"
              src={props.img}
            />
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b>{props.shopname}</b>
            {/* <p className="text-default-500">{props.description}</p> */}
          </CardFooter>
        </Card>
    </div>
  )
}

export default Shopcards