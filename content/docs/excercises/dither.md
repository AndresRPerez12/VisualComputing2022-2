# Excercise: Dithering

{{< hint info >}}
**Excercise**  
Research some dither visual apps.
{{< /hint >}}

## Background
The basic notion for dithering is adding noise in random patterns of pixels to improve the image quality while avoiding banding. In graphics, banding is the visible change from one color to the next instead of a smooth transition in a color gradient.

<img src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Colour_banding_example01.png" alt="banding illustration" style="width: 50%;"/>

Dithering adds random patterns of pixels to a digital file. One of the earlier uses of dithering was in black and white newspapers. By using dithering, a gray scale could be simulated by placing black dots in specific locations. In web graphics, it is used to avoid banding whe working with reduced file sizes and color spaces. By mixing shades from a limited color space, it is possible to reduce the filse size while maintaining the perception of the original color.

<img src="https://webstyleguide.com/wsg2/graphics/graphics/7.09.gif" alt="dithering of two colors" style="width: 50%;"/>

When used to reduce banding, the color gradient can be preserved even if in the reduced color space. The first image hasn't been dithered and the banding is clearly visible:

<video src="https://www.lifewire.com/thmb/47MwVaMey8iW-a6XVVS3QRa4vpI=/650x0/filters:gifv(webm)/color-banding-b341416163364e6e9626c682f8db46c7.gif" alt="banded image" style="width: 50%;"></video>

Meanwhile, the second image is perceived as a smooth trasnstion between the colors:

<img src="https://www.lifewire.com/thmb/X0mFqgSpd7V4GbMuVqL_0PFtjFo=/650x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/color-gradient-7d2d8c622647490b9df9e24ea0ad0f67.jpg" alt="dithered image" style="width: 50%;"/>


Dithering also reduces the sharpness of the image, and may introduce a noticeable grainy pattern. This is specially significant when a full color image is dithered into a 216-color browser-safe palette. If the user has their display set to 256 colors, web browsers will dither the image colors into the 216-color browser-safe color pallette. This is a very rare occurace nowdays, but it is still important to remmeber that a small percentage of users will see the colors after dithering.

## Conclusions
Dithering is a very important tool in computer graphics. Understanding the limitations of the used color spaces and the display methods in which they are visualized is key for presenting a great version of your graphics to the greatest amount of users possible. For example, by adding dithered images to a website, both speed and accesaibility can be improved by using a smaller image file size that still preserves a significant amount of the color perception of the original.

## References

* [What Is Dithering in Image Processing?](https://www.lifewire.com/what-is-dithering-4686105) by Lisa Mildon, Lifewire
* [Dithering](https://webstyleguide.com/wsg2/graphics/dither.html), Web Style Guide
* [WHY YOUR WEBSITE SHOULD USE DITHERED IMAGES](https://endtimes.dev/why-you-should-dither-images/)
* [Colour Banding](https://en.wikipedia.org/wiki/Colour_banding)