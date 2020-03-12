function Render(ctx, spriteImage) {


    this.render = function (viewState) {

        ctx.drawImage(spriteImage, 0 0, 110, 100, 0, 0, 110, 108);

    };
}