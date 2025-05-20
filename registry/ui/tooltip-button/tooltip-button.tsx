"use client"

import * as React from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"

export interface TooltipButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
  tooltipText: string
  tooltipSide?: "top" | "right" | "bottom" | "left"
  tooltipAlign?: "start" | "center" | "end"
}

export function TooltipButton(props: TooltipButtonProps) {
  const { text = 'Button', tooltipText = 'Tooltip', tooltipSide = "bottom", tooltipAlign = "center", children, ...extProps } = props;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button {...extProps}>
            {text}
          </Button>
        </TooltipTrigger>
        <TooltipContent side={tooltipSide} align={tooltipAlign}>
          {tooltipText}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
} 