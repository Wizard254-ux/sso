import { useState } from "react";
import {
  DeFiChart,
  PoolBox,
  Rate,
  JoinModal,
  ThanksModal,
} from "../components";
import { Button } from "../components/lib";
import { ReactComponent as TwitterSvg } from "../assets/img/icons/twitter-button.svg";
import { ReactComponent as SandGlassSvg } from "../assets/img/icons/sandglass.svg";
import { ReactComponent as SearchConfirmSvg } from "../assets/img/icons/searchconfirm.svg";
import { ReactComponent as LockSvg } from "../assets/img/icons/lock.svg";
import { ReactComponent as LogoSvg } from "../assets/img/icons/logo.svg";
import AaveImage from "../assets/img/defi/Aave.png";
import CompoundImage from "../assets/img/defi/Compound.png";
import ConvexImage from "../assets/img/defi/Convex.png";
import CurveImage from "../assets/img/defi/Curve.png";
import DefycaImage from "../assets/img/defi/Defyca.png";
import FraxImage from "../assets/img/defi/Frax.png";
import PancakeswapImage from "../assets/img/defi/Pancakeswap.png";
import RibbonImage from "../assets/img/defi/Ribbon.png";
import ToeknSetImage from "../assets/img/defi/Toekn Set.png";
import { ReactComponent as EthereumLogoSvg } from "../assets/img/icons/chain-logos/Ethereum.svg";
import { ReactComponent as OptimismLogoSvg } from "../assets/img/icons/chain-logos/Optimism.svg";
import { ReactComponent as FantomLogoSvg } from "../assets/img/icons/chain-logos/Fantom.svg";
import PoolLinesSvg1 from "../assets/img/icons/pool-lines-1.svg";
import PoolLinesSvg2 from "../assets/img/icons/pool-lines-2.svg";
import PoolLinesSvg3 from "../assets/img/icons/pool-lines-3.svg";
import PoolLinesSvg4 from "../assets/img/icons/pool-lines-4.svg";

const chartData = {
  labels: [
    "Pancake Swap",
    "Frax",
    "Aave",
    "Ribbon",
    "Compound",
    "Convex",
    "Defyca",
    "Curve",
    "Toekn Set",
  ],
  images: [
    PancakeswapImage,
    FraxImage,
    AaveImage,
    RibbonImage,
    CompoundImage,
    ConvexImage,
    DefycaImage,
    CurveImage,
    ToeknSetImage,
  ].map((src) => {
    const image = new Image();
    image.src = src;
    return image;
  }),
  datasets: [
    {
      label: "# of Interactions",
      data: [12, 13, 3, 5, 2, 3, 8, 2, 3],
      backgroundColor: [
        "#FEE182",
        "#000000",
        "#41D6E1",
        "#B6509E",
        "#FC0A54",
        "#00D395",
        "#3A3A3A",
        "#E5EAF0",
        "#FFFFFF",
      ],
      borderColor: [
        "rgba(0, 0, 0, 0)",
        "rgba(0, 0, 0, 0)",
        "rgba(0, 0, 0, 0)",
        "rgba(0, 0, 0, 0)",
        "rgba(0, 0, 0, 0)",
        "rgba(0, 0, 0, 0)",
        "rgba(0, 0, 0, 0)",
        "rgba(0, 0, 0, 0)",
        "#D0D0D0",
      ],
    },
  ],
};

export function Result2({ wallet, score }) {
  const cellWidth = [14.5, 13.5, 29.9, 12.9, 10.6];
  const porotocols = [
    {
      name: "Curve",
      share: 0.243,
      chain: 1,
      pools: [
        {
          name: "tricrypto pool",
          yield: 0.243,
          risk: 1,
        },
      ],
    },
    {
      name: "Compound",
      share: 0.111,
      chain: 1,
      pools: [
        {
          name: "USDT lending",
          yield: 0.0173,
          risk: 2,
        },
        {
          name: "ETH-cbETH",
          yield: 0.0215,
          risk: 3,
        },
      ],
    },
    {
      name: "Convex",
      share: 0.099,
      chain: 1,
      pools: [
        {
          name: "CRV",
          yield: 0.1978,
          risk: 4,
        },
        {
          name: "sdCRV staking",
          yield: 0.2155,
          risk: 5,
        },
      ],
    },
    {
      name: "Sommelier",
      share: 0.087,
      chain: 2,
      pools: [
        {
          name: "KSM",
        },
        {
          name: "MATIC",
        },
        {
          name: "AVAX",
        },
        {
          name: "FIL",
        },
      ],
    },
    {
      name: "Frax",
      share: 0.056,
      chain: 3,
      pools: [
        {
          name: "KSM",
          yield: 0.2273,
          risk: 5,
        },
        {
          name: "MATIC",
          yield: 0.1501,
          risk: 2,
        },
        {
          name: "AVAX",
          yield: 0.0922,
          risk: 1,
        },
      ],
    },
    {
      name: "Sommelier",
      share: 0.087,
      chain: 2,
      pools: [
        {
          name: "KSM",
          yield: 0.0473,
        },
        {
          name: "MATIC",
          yield: 0.0575,
        },
        {
          name: "AVAX",
          yield: 0.1011,
        },
        {
          name: "FIL",
          yield: 0.1192,
        },
      ],
    },
  ];

  const [modal, setModal] = useState("");

  const handleShowJoinModal = () => {
    setModal("joinModal");
  };

  const handleShowThanksModal = () => {
    setModal("thanksModal");
  };

  const handleCloseModal = () => {
    setModal("");
  };

  const handleSubmitEmail = (email) => {
    handleShowThanksModal();
  };

  return (
    <>
      <div className="px-[64px] py-[14px]">
        <div className="flex items-center gap-[16px]">
          <Rate size="small" score={score} />
          <div>
            <div>
              <p className="font-caption font-medium text-[32px] leading-[1.1] text-grey-dark">
                Your Risk Profile
              </p>
              <button className="border-none background-none font-body font-bold text-[18px] leading-[1.2] spacing-[-0.5px] text-yellow-dark hover:text-yellow-deep transition-all duration-300">
                Explore Risk
              </button>
            </div>
          </div>
          <Button type={6} className="ml-auto">
            <TwitterSvg />
            Share
          </Button>
        </div>
        <div className="flex gap-[14px]">
          <div>
            <div
              className="relative w-[402px] h-[402px] bg-white mr-[35.55px] rounded-full"
              style={{
                boxShadow: "1.83144px 21.0615px 32.9658px rgba(0, 0, 0, 0.1)",
                backdropFilter: "blur(6.41002px)",
              }}
            >
              <DeFiChart data={chartData} />
              <LogoSvg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30.2%] h-auto" />
            </div>
            <div className="mt-[85px]">
              <p className="font-caption font-medium text-[20px] leading-[1.46] text-grey-dark">
                Portfolio Highlights
              </p>
              <div className="flex flex-col gap-[16px] mt-[12px]">
                <div
                  className="flex items-center px-[14px] py-[12px] bg-white rounded-[8px]"
                  style={{
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.06)",
                  }}
                >
                  <SandGlassSvg className="w-[26px]" />
                  <p className="font-caption font-medium text-[18px] leading-[1.1] text-grey-black w-[77px] ml-[8px]">
                    96%
                  </p>
                  <p className="text-[14px] leading-[1.1] text-grey-dark">
                    protocols are live or 2.4+ years
                  </p>
                </div>
                <div
                  className="flex items-center px-[14px] py-[12px] bg-white rounded-[8px]"
                  style={{
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.06)",
                  }}
                >
                  <SearchConfirmSvg className="w-[26px]" />
                  <p className="font-caption font-medium text-[18px] leading-[1.1] text-grey-black w-[77px] ml-[8px]">
                    78%
                  </p>
                  <p className="text-[14px] leading-[1.1] text-grey-dark">
                    protocols were audited in last 6 months
                  </p>
                </div>
                <div
                  className="flex items-center px-[14px] py-[12px] bg-white rounded-[8px]"
                  style={{
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.06)",
                  }}
                >
                  <LockSvg className="w-[26px]" />
                  <p className="font-caption font-medium text-[18px] leading-[1.1] text-grey-black w-[77px] ml-[8px]">
                    88%
                  </p>
                  <p className="text-[14px] leading-[1.1] text-grey-dark">
                    assets are low-risk assets
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="px-[16px] py-[22.5px]">
              <p className="font-caption font-medium capitalize text-[32px] leading-[1.1] text-grey-dark">
                Your personalized DeFi portfolio
              </p>
              <p className="text-[14px] font-normal leading-[1.2] tracking-[-0.5px] mt-[8px] text-grey-black child-span:text-yellow-dark">
                Your personalized DeFI Portfolio has <span>9 protocols</span> &{" "}
                <span>17 pools</span> across <span>5 chains</span>. It delivers{" "}
                <span>8.86% APY</span> on average. Curve Finance, Compound,
                Convex are among the top-3 of the protocols, and are the rates
                as A+ for their security and liquidity.
              </p>
            </div>
            <div className="flex flex-col flex-grow-[1] bg-white rounded-[8px] mt-[8px]">
              <div className="flex font-body font-medium text-grey-deep text-[14px] leading-[1.1] px-[16px] py-[8px] border-b-[1px] border-b-grey-light38 overflow-y-scroll">
                <div
                  style={{
                    width: `${cellWidth[0]}%`,
                  }}
                >
                  Share
                </div>
                <div
                  style={{
                    width: `${cellWidth[1]}%`,
                  }}
                >
                  Protocol
                </div>
                <div
                  style={{
                    width: `${cellWidth[2]}%`,
                  }}
                >
                  <p className="ml-[50%]">Pool</p>
                </div>
                <div
                  style={{
                    width: `${cellWidth[3]}%`,
                  }}
                >
                  30D APY
                </div>
                <div
                  style={{
                    width: `${cellWidth[4]}%`,
                  }}
                >
                  Risk
                </div>
                <div className="flex-grow-[1]">Chain</div>
              </div>
              <div className="h-[494px] overflow-y-scroll">
                {porotocols.map((protocol) => (
                  <div className="flex px-[16px] py-[15px]">
                    <div
                      className="font-normal text-[14px] leading-[1.1] text-grey-black"
                      style={{
                        width: `${cellWidth[0]}%`,
                      }}
                    >
                      {Number(protocol.share * 100).toFixed(1)}%
                    </div>
                    <div
                      className="font-bold text-[14px] leading-[1.1] text-grey-darkest"
                      style={{
                        width: `${cellWidth[1]}%`,
                      }}
                    >
                      {protocol.name}
                    </div>
                    <div
                      className="flex font-normal text-[10px] leading-[1.5] text-grey-black"
                      style={{
                        width: `${cellWidth[2]}%`,
                      }}
                    >
                      <div className="w-1/2 py-[2px] px-[9px]">
                        {protocol.pools.length === 1 && (
                          <div className="flex items-center h-[11px]">
                            <img
                              className="w-full my-auto"
                              src={`${PoolLinesSvg1}#svgView(preserveAspectRatio(none))`}
                              alt="Pool Lines 1"
                            />
                          </div>
                        )}
                        {protocol.pools.length === 2 && (
                          <img
                            className="w-full h-[26px]"
                            src={`${PoolLinesSvg2}#svgView(preserveAspectRatio(none))`}
                            alt="Pool Lines 2"
                          />
                        )}
                        {protocol.pools.length === 3 && (
                          <img
                            className="w-full h-[41px]"
                            src={`${PoolLinesSvg3}#svgView(preserveAspectRatio(none))`}
                            alt="Pool Lines 3"
                          />
                        )}
                        {protocol.pools.length === 4 && (
                          <img
                            className="w-full h-[56px]"
                            src={`${PoolLinesSvg4}#svgView(preserveAspectRatio(none))`}
                            alt="Pool Lines 4"
                          />
                        )}
                      </div>
                      <div className="flex-grow-[1]">
                        {protocol.pools.map((pool) => (
                          <div>{pool.name}</div>
                        ))}
                      </div>
                    </div>
                    <div
                      className="font-normal text-[10px] leading-[1.5] text-grey-black"
                      style={{
                        width: `${cellWidth[3]}%`,
                      }}
                    >
                      {protocol.pools.map((pool) => (
                        <div className="w-[34px] text-right">
                          {typeof pool.yield === "undefined"
                            ? "-------"
                            : `${Number(pool.yield * 100).toFixed(2)}%`}
                        </div>
                      ))}
                    </div>
                    <div
                      className="font-normal text-[12px] leading-[1.25]"
                      style={{
                        width: `${cellWidth[4]}%`,
                      }}
                    >
                      {protocol.pools.map((pool) => (
                        <div
                          className={
                            pool.risk <= 2
                              ? "text-[#32CC86]"
                              : pool.risk <= 4
                              ? "text-[#F0B93A]"
                              : pool.risk === 5
                              ? "text-[#E31818]"
                              : "text-grey-black"
                          }
                        >
                          {typeof pool.risk === "undefined" ? "--" : pool.risk}
                        </div>
                      ))}
                    </div>
                    <div className="flex text-grey-black flex-grow-[1]">
                      <div className="flex gap-[8px] items-center h-min">
                        {protocol.chain === 1 && (
                          <>
                            <EthereumLogoSvg /> Ethereum
                          </>
                        )}
                        {protocol.chain === 2 && (
                          <>
                            <OptimismLogoSvg /> Optimism
                          </>
                        )}
                        {protocol.chain === 3 && (
                          <>
                            <FantomLogoSvg /> Fantom
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div
              className="flex items-center px-[14px] py-[12px] bg-white rounded-[8px] overflow-y-scroll"
              style={{
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.06)",
              }}
            >
              <p
                className="flex items-center font-caption font-medium text-[18px] leading-[1.46] text-grey-black child-span:ml-[4px] child-span:text-[14px] child-span:font-bold child-span:leading-[1.1] child-span:text-grey-deep child-span:font-body"
                style={{ width: `${cellWidth[0]}%` }}
              >
                100%
              </p>
              <p
                className="flex items-center font-caption font-medium text-[18px] leading-[1.46] text-grey-black child-span:ml-[4px] child-span:text-[14px] child-span:font-bold child-span:leading-[1.1] child-span:text-grey-deep child-span:font-body"
                style={{ width: `${cellWidth[1]}%` }}
              >
                9<span>Protocols</span>
              </p>
              <p
                className="flex items-center justify-center font-caption font-medium text-[18px] leading-[1.46] text-grey-black child-span:ml-[4px] child-span:text-[14px] child-span:font-bold child-span:leading-[1.1] child-span:text-grey-deep child-span:font-body"
                style={{ width: `${cellWidth[2]}%` }}
              >
                17<span>Pools</span>
              </p>
              <p
                className="flex items-center font-caption font-medium text-[18px] leading-[1.46] text-grey-black"
                style={{ width: `${cellWidth[3]}%` }}
              >
                8.86%
              </p>
              <p
                className="flex items-center font-caption font-medium text-[18px] leading-[1.46] text-grey-black"
                style={{ width: `${cellWidth[4]}%` }}
              >
                A
              </p>
              <p className="flex flex-grow-[1] items-center font-caption font-medium text-[18px] leading-[1.46] text-grey-black child-span:ml-[4px] child-span:text-[14px] child-span:font-bold child-span:leading-[1.1] child-span:text-grey-deep child-span:font-body">
                5<span>Chains</span>
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center mt-[18px]">
          <p className="ml-auto font-normal text-[12px] leading-[1.25] italic text-grey-darker2 max-w-[545px]">
            This is a theoretical portfolio that doesn’t account for gas fees,
            bridging fees, management fees, or any other fees associated with
            the listed pools. The APY data is dated March 5, 2023, 20:59 UTC.
            The APY data doesn’t account for the asset in which payout is made,
            potential boosts, and requirements for participating in any listed
            pool. Although we tried our best to develop a system that generates
            a robust portfolio from a risk-reward perspective, exercise caution
            and conduct independent research.
          </p>
          <Button type={7} className="ml-[14px]" onClick={handleShowJoinModal}>
            Invest with One Click
          </Button>
        </div>
        <h3 className="text-[32px] leading-[1.1] text-greay-dark mt-[28px]">
          List of Pools
        </h3>
        <div className="grid grid-cols-4 gap-x-[20px] gap-y-[64px] mt-[48px]">
          <PoolBox share={0.243} risk={2} apy={0.1407} />
          <PoolBox share={0.243} risk={2} apy={0.1407} />
          <PoolBox share={0.243} risk={2} apy={0.1407} />
          <PoolBox share={0.243} risk={2} apy={0.1407} />
          <PoolBox share={0.243} risk={2} apy={0.1407} />
          <PoolBox share={0.243} risk={2} apy={0.1407} />
          <PoolBox share={0.243} risk={2} apy={0.1407} />
          <PoolBox share={0.243} risk={2} apy={0.1407} />
          <PoolBox share={0.243} risk={2} apy={0.1407} />
        </div>
      </div>
      {modal === "joinModal" && (
        <JoinModal
          wallet={wallet}
          onSubmit={handleSubmitEmail}
          closeModal={handleCloseModal}
        />
      )}
      {modal === "thanksModal" && (
        <ThanksModal
          closeModal={handleCloseModal}
          handleExplorePortfolio={handleCloseModal}
        />
      )}
    </>
  );
}
