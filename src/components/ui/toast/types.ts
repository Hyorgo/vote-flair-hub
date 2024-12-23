import type { ComponentPropsWithoutRef, ElementRef } from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { VariantProps } from "class-variance-authority"
import { toastVariants } from "./variants"

export type ToastProps = ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
  VariantProps<typeof toastVariants>

export type ToastActionElement = React.ReactElement<typeof ToastPrimitives.Action>

export type ToastRootRef = ElementRef<typeof ToastPrimitives.Root>
export type ToastActionRef = ElementRef<typeof ToastPrimitives.Action>
export type ToastCloseRef = ElementRef<typeof ToastPrimitives.Close>
export type ToastTitleRef = ElementRef<typeof ToastPrimitives.Title>
export type ToastDescriptionRef = ElementRef<typeof ToastPrimitives.Description>
export type ToastViewportRef = ElementRef<typeof ToastPrimitives.Viewport>