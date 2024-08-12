import { css } from "@emotion/react"

const ProductHunt = () => {
    return (
        <a
            href="https://www.producthunt.com/posts/ideas-down?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-ideas&#0045;down"
            target="_blank"
        >
            <img 
                src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=479196&theme=light" 
                alt="Ideas&#0032;Down - Clear&#0032;your&#0032;mind&#0032;and&#0032;make&#0032;room&#0032;for&#0032;your&#0032;next&#0032;big&#0032;idea&#0046; | Product Hunt" 
                css={imgCSS}
                width="250" 
                height="54"
            />
        </a>
    )   
}

const imgCSS = css`
    width: 250px;
    height: 54px;
    position: sticky;
    left: 16px;
    top: 16px;

`

export default ProductHunt