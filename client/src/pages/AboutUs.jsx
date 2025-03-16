import { Users, Heart, Dumbbell, Utensils, Brain } from "lucide-react"

const AboutUs = () => {
  return (
    <div className="bg-[#F7F7FD] min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#0E0E2C] to-[#00A8FF] py-24 pt-32"> {/* Increased padding-top */}
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Virtue Fit</h1>
            <p className="text-xl mb-8">Empowering you to achieve balance in mind, body, and nutrition.</p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
            <path
              fill="#F7F7FD"
              fillOpacity="1"
              d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16 bg-[#F7F7FD]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-[#0E0E2C]">Our Mission</h2>
            <p className="text-[#0E0E2C] text-lg">
              At Virtue Fit, we believe in a holistic approach to wellness. Our mission is to help you achieve balance
              in your life through mindful meditation, nutritious food choices, and effective workouts.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-8 text-center hover:shadow-lg transition-shadow border border-[#ECECEE]">
              <div className="inline-block p-4 bg-[#F7F7FD] rounded-full mb-4">
                <Brain className="h-8 w-8 text-[#00A8FF]" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#0E0E2C]">Meditation</h3>
              <p className="text-[#0E0E2C]">
                Discover peace and clarity through our guided meditation practices designed for all experience levels.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8 text-center hover:shadow-lg transition-shadow border border-[#ECECEE]">
              <div className="inline-block p-4 bg-[#F7F7FD] rounded-full mb-4">
                <Utensils className="h-8 w-8 text-[#00A8FF]" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#0E0E2C]">Nutrition</h3>
              <p className="text-[#0E0E2C]">
                Fuel your body with our nutritionist-approved meal plans and recipes tailored to your fitness goals.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8 text-center hover:shadow-lg transition-shadow border border-[#ECECEE]">
              <div className="inline-block p-4 bg-[#F7F7FD] rounded-full mb-4">
                <Dumbbell className="h-8 w-8 text-[#00A8FF]" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#0E0E2C]">Workouts</h3>
              <p className="text-[#0E0E2C]">
                Transform your body with our diverse range of workout programs designed for all fitness levels.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white border-t border-b border-[#ECECEE]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <img
                src="/placeholder.svg?height=400&width=600"
                alt="Virtue Fit Team"
                className="rounded-lg shadow-md border border-[#ECECEE]"
              />
            </div>
            <div className="md:w-1/2 md:pl-12">
              <h2 className="text-3xl font-bold mb-6 text-[#0E0E2C]">Our Story</h2>
              <p className="text-[#0E0E2C] mb-4">
                Virtue Fit was founded in 2020 by a group of wellness enthusiasts who recognized the need for a
                comprehensive approach to fitness that addresses both physical and mental wellbeing.
              </p>
              <p className="text-[#0E0E2C] mb-4">
                What started as a small community has grown into a platform that helps thousands of people achieve their
                wellness goals through our three pillars: meditation, nutrition, and physical fitness.
              </p>
              <p className="text-[#0E0E2C]">
                Our team of certified trainers, nutritionists, and meditation experts work together to create programs
                that are accessible, effective, and enjoyable for everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-[#F7F7FD]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#0E0E2C]">Our Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md border border-[#ECECEE]">
              <div className="flex items-center mb-4">
                <div className="bg-[#F7F7FD] p-3 rounded-full mr-4">
                  <Heart className="h-6 w-6 text-[#00A8FF]" />
                </div>
                <h3 className="text-xl font-semibold text-[#0E0E2C]">Compassion</h3>
              </div>
              <p className="text-[#0E0E2C]">
                We approach wellness with kindness and understanding, meeting you wherever you are in your journey.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-[#ECECEE]">
              <div className="flex items-center mb-4">
                <div className="bg-[#F7F7FD] p-3 rounded-full mr-4">
                  <Users className="h-6 w-6 text-[#00A8FF]" />
                </div>
                <h3 className="text-xl font-semibold text-[#0E0E2C]">Community</h3>
              </div>
              <p className="text-[#0E0E2C]">
                We believe in the power of connection and support in achieving lasting wellness transformations.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-[#ECECEE]">
              <div className="flex items-center mb-4">
                <div className="bg-[#F7F7FD] p-3 rounded-full mr-4">
                  <svg
                    className="h-6 w-6 text-[#00A8FF]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#0E0E2C]">Integrity</h3>
              </div>
              <p className="text-[#0E0E2C]">
                We provide evidence-based guidance and maintain the highest standards in all our programs.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-[#ECECEE]">
              <div className="flex items-center mb-4">
                <div className="bg-[#F7F7FD] p-3 rounded-full mr-4">
                  <svg
                    className="h-6 w-6 text-[#00A8FF]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#0E0E2C]">Innovation</h3>
              </div>
              <p className="text-[#0E0E2C]">
                We continuously evolve our approach based on the latest research in fitness, nutrition, and mental
                wellness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white border-t border-b border-[#ECECEE]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#0E0E2C]">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="text-center">
                <div className="mb-4 relative mx-auto w-48 h-48 rounded-full overflow-hidden border-4 border-[#00A8FF]">
                  <img
                    src={`data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAyAMBIgACEQEDEQH/xAAcAAACAwEBAQEAAAAAAAAAAAAFBgMEBwACAQj/xABFEAABAwMDAgMFBQMJBgcAAAABAgMEAAURBhIhMUETIlEUMmFxgQcjkaGxFSTBQlJicoKS0fDxFzM0Q3PhFjVEU3STsv/EABkBAAMBAQEAAAAAAAAAAAAAAAABAgMEBf/EACQRAAICAgICAgIDAAAAAAAAAAABAhEDIRIxBEEiURMyFCNh/9oADAMBAAIRAxEAPwAu04Hc+EFuY7IQTVhLLxSD4Sgc42K4IpoYkpjF1bFubaCEhQKU43flSjeb34U5UqcVt8kgJHBz2pUAO1Lc5mn4bUyTbnvZXV7Eu5G0q/yDSs59obg/3cP8VUdvV/c1VZo9of3NR1SS4fJ5glPKR+NItws7UaUtDDqi0k4ClpwfrTpEsYI2vpCuXYidvwPIpttlz/aEVD6EkJPTNJEPSE2Rbly47rLqUDJQFebHyp10hEfcsrGyOtQ9Qkmk0NBFDhIzXvcfSr6LTNV0iuf3ahfiuxVASGltk9Nw61JRCFnHNWI8STKz7O0teOu0VGgheRxRC23N+3hSWwhSFHJSod6Ao+IslyWeGCP6xxUi7DcUI3FoH4JWCatK1NKPustJ/E1CrUM5R99CR/RRRoATsIJGORwa+7asMNPynFFptbq+qiBVpNonq6RlD5kCihg5KDkEEgjpg4xVozJuAEy3cDj3zUku3SoaPEfawj1BBqmXABknAHOTSAsPLWpgq9pUVYyfEUcUJXMQy42JdwhJ8Q+RJdAKqzrU2o37xIcQmShERlR8NtCiD/a9T/jS482t5vyKwk8gjg80qbKP0PHhftBkLghtQHClIdSRUcu3PQynx0YCuAc5FYjpnUE6wyjJgyiytOSUE5Qsd8p6HtWywLtP1HAjy0MLWw4kKTsTwD3+dOqFs+hsCvYCe9Ti2XBQyIy/rVNalIWUKBChwQe1ICYeXlPBznPpV0XacMAPk9unNC/Fx1NfEyClYUnOQcinYUG/Eurwyn2jn4ba6ub1HJcwlEdClH0yc/Sup2hUZTBOtrq7IjuX9bRZHPHCvlgV4ttr1TMmJYK1zfDVv2qT/E1oF4Yi6SVHfkvuOiQVIwlvoQOtRxPaC+JdtdfTvHCg1wB8iKrZOgHHtOoYc5mRc7YhmKtZG8LQVIJHHANK+rV24uSUtpfEorG7d0p1Rfbnd5bYdnoVDjvFL7agGzuA4zxSHq2G4q9vvIHiocIwUc00TIF2ybMiZ9nSrr1Cq1rTut3mLWwym1+IltO3yqCKyy3N4SsEYI7HtWg6LhR5SENSpHgN8+b1PpSloIDCvXczPktOB/1M1Tud/nXVtKDETsSN+B2+dGZthtcKL4y3nl7uE+cYJrPpipUbVa2461eySI+3IV7mKWy9eg3DeWV4W0EknGB1o2mxXRzB9mCc/wA5wClqJb5DufCnqBSckpwSKYU6gutkeQm7uqmQnB5ZLTQSpv8ArD+NJR+ws83S0XC3W6ROcbQ42w2XFpbXlW0ck/hSAv7QYAP3bLivQ0+X6S/dUOWmbKmRY0lo/vLKUlJSf5JxzWSSLVCs9zkRw6iWpk8OlOEgdenrQ6Q1bZo+ldWyHmluQmTtPvBwcGjx1PcTxtaSfgiselzHXGUOtOOJKM5QF4IH9E+tGNP6kfjymo9xfMiK8jcy+rqB8fiO4qHJotRs0GRdZ88JYdcylShhISACaluGjbhcbe9FVJaj+Kkp8RKiVD49P41ThvRZTrjbDyVFrBcweU1bvOsbbDY8Fq4FCwONzh3VUdky10fnu8RblbJr0efFW06yopcRt4yO/wAu9RW9m5zFBMCA89u90obJA+vStQjzoc2Wkzp6VuvOLWl17JSsZwPMeO2Kb7dPt1ubPtEyNHAwAAoAn5AdaiWSnVG8MKlHlZiN20vdrUxHkXNsN+MSEpK+Rjnmtn+ze7O23RkJgNJdAKylW7sVE17vtph6shISHVbGnQoK2lJHr1HpQDU2pmNKyG7THi5DbIIQg+VtPYfUDP1pKbfQTxpK7NMt8653JLimxGYSg48wKj+Gahe067IfW/KnblK5O1vA/Wsa/wBp0xvPs8Yoz/SxVGR9ol2dzhJ59VmtNtbRz69M1iTDDElxjxErKD1FeQxgc1jS9b3o52OhGagVq2+uH/j1D6ip4srkjfIRbghEoAbh3rqzZy4zXvsvbkmSv2gP48QHnrXVdSXRNoYJ0e4TEoVIfW6pJO3f2zQVl+/woqmlXJ1taVYRtWOma46+bfdXGZhqK0JKs460NRdn5EBEx9pQUpROwpwcClFtsJJVoa5tthqsc9wo2uLcMlKld145P5Umx73Itj7YLTToGFbSng0Wfvs6dp+KqSGUsyGltpShOCkgZGT3pXmnc6k/0RitUjKTHa6Nw75bP25CYbjugBLzY4yapW7Uka1luM6wtawcjA4FVLKZi7DIbjJQlnd5lK60Mfs14lupcitl1HdQArOdVsuF2Nsu+uyLaZL6FLLbm7aTx9BSynU6rlNPtLCI8bbgjvn51HcozzVtUGfFLreS4gnPTrS3BnrkLDXhNgcnp3xRxTKtjrYNcs2GDOTCT4j0h3KctFQQAMZoppjVbsl1yy3NfjsrTtbU4MKAxWWsy3U8oVt+AFE37nIjXBBU6CpOCCU9Ksk0TXBmRoFtWw+tASVNrCVY3ccfpWby3luvvOrOE7itZ+uAPyz9KeNYPSpmlokxxbSkJcBO0dDS+3HTKmR0OgJbQPGd2jjAHGf1rDM6o1xK9ELEcvyW43urHvHHQnA/ifwrRHtE2r9iezsIWl4ZW29vO5C/UenPakm2xpPtbbrDKnXXF+IWwMnHPbI/XtT005e3Yr7LhQ04UhTKceGQnODnlWDWClZ2xxpIS9OPPOeGpKUsSJADcggdVIJH8DRHV1k0262ZNwuiU3FKMlnoSPTA5qnp5txtDyJCtsyLIWpYznduXzz3wf8A9UB1giQzqJ8ywSVJBSP6NdOKVo4csakX0O2iZbmoSYpS2yNyUOnOMnnnrjNaVIs9pk2yHGeaSrwm0keEvCkY4BBHNZRabRcbq5EXDa+5CD4z6zhCRkZ57/SmnTbqApfizWS1gjO4DdjIzwAfzrLKqdnV48lJUP8AEQwww3HjDY0Dz6/ievzrOtS6ReRPkytj87eoqyle5YHYbep7DjOMdqPnVFvtyUuT3S2ykYR3U4fQDrS/OnahuMiNeIiURVx1LV7G4o4cQojAV6HCR8jSxW9+ic9dPsUpTMKKopejvtKzgpdQU8/Wq5XAwdrSq12y3Bm6wnDNY3I6LjyEAlHwIPX59DUatB6YuAWpmOuI4rkeG6opH0JOPkOK3a0cmw3o6x2eXY4r7lkipWUDhTYJNFGoulzdzak2+ImYlvxAj2cYx88YqPTsByyRExG31LaQMebnFeUW16Rdva/aggp6YHOPSs1ljHRq43sF/aHGg2+yKbjxWkshYJbSNqc5HNfKOvWlm6PvRLpiQwcFIPFdWkqZnRnOgrAlF58SS3yMghVGNbWVM66MxmHBFQI61qUkccf61Qsk6PZ9TW8hRRFmRVKXuJP3gI/xrtT6gYM+XKS6EspZU0g4z1rOMX+Qpv8ArF1TtuZ0zamobMjxFuBS1uHIyUnNCJIwUf1BX03RgadiJcdSH0uDCTx04r7MA+6I6FsGuhMxkhu0y3HNkdbfeLbS/eV3FMFkbC8mJOT7GgYSQnnNJlmK3LBPQvgAeWmHSlxjWqyhpTBdXIISgJ9azzR5KjTC2pKgdfoMozbo3EexhhS1LKeoI6VnFgaC5jWOigf0rXr+gOMyvvfDPsyuR3rK9Pf8exn4/pVqDjCxNpyBIbPm7cmiV6ZIlpz3aSRVYpJK8dMn9aJ6gOZTWB/6dB4p/Qn0H/aXJOipbJBKGinJrw2yptCUuApDpSlSvVAAJ/UD60S0PapV8sFzisoKW1rADqhhOe+PWisaDFu0ZlYQ6j2dxxpTZG1Q5Gc/gCK4/Jejq8aO7Yv224KN4aUlaW152jPx6foPxpsYkLLEmVIlgKS2UutbgvcMc4BGRwKEzdKsubPAcU0tvjOOopfumrLhGuCrSos+zpUlLsgt4cUnvz0rGGzvbSRa09DlMzFS1Auqc3KcTnPmIzjPpTDedPRtS3kXW5vERkNoQhlryqcxnOT2Hy5qbT3n8dIKNq0pTuB4ScfxqF2UqP4zbhCXEKIKQrI6cYP+elbeLNOLvs4fKi+SCqEo2KZYSG2G0bUBsYCR8BSTc9O3RmWpMKZGbiblFshoFTaSc7c+gzTo1wgDBAHoary2gW9yk+T+b6iup00c0W10Ktm07GjPiS445JfPIekdv6o7fPrTEWDs2g54wOOlV4rqVOFKiM5yaJR1Z64pDK8dCIjgPISdw+icUYgvAITzyD2oHfHhHheKP5JJP4V1rmLejNuDCELAO4njFUI0G0OtSVeG95lgdc9aMCDHBylGDSVapQbdSpBHHIo5qDUn7FjhZYDq3OGkhfVXxqXCIWy+hhKLkUp/9vKcmuoXbLkuTJZkyilsrR0B4FfaVINmdXq+WoO2SVHtKRHZfWhQKuoIxj8atJulpuzy40a0tISc7lHByaVL9b5jdoCvaoxbRICtqTykk0atEBMWcFJkRnPKPIhWST3qnBN2Tb6KVuhwpEd8SYjTiWVq2JKelVZc1lLbSxBaUCnhPpV+1YCZqFHA3K+lBFSIbTaXHZWW2wQk+tUhMLwJQkW2cptpLSSPdTRGx+Cu3RwpQCwvy5oHZ32nos8xl72ijhRr3HivXC1xUxVJC2nQVZOOKGrCLoJ64kvMMv8AhIUr7vC8HoKRrM8hDjSgjnJ5+lO2sQdz2Tx4OCPWs+tjm3w8jHfNU2+NAkrstw2VONbwgEKJ/WtY0vo6E203NvkZL8lSEhLLoyloAen87n6Uq/ZXZlTJrtykp/doailpJHC3D1/u/qfhWmSJaGRlXSuXLkrR1Ycd7YTb8NKEtMpShtIwlKRgAfKkp6Imz69cbSSIt6ZLyB2S+3woD5pIP0pgtN3iSnVJadQojqAaRPttupak2SNCdKJLC1yvEQeWzwE/x/Coh89GuRcNj47FQWTgdverMtc2IRp6pzKc70JHToc0e0x9okC6sJauKm4czopKztQv4pP8DyKZLrCZu9tXjCkKTwU85HzrOcXE1jNSWzPdNturbQ7GV92lWxxGec8nGO/TNBbxdH4F6dStJ2pdxn1TnymjjcIxJa4q0odeUUKcbSRv3IyErA78KP40MuLZnTpMVLGSRxtHI/z8azwfGeyc65R0Ndsu7clhKlHnA71NJmeLklXlA4ArPrPOehOFDiDlHlUD1FM8aQuZLTGaBPPJ9B3rvT0cLVMtsJw8t0n3uaIsq8oOeO/FDpTzLQU4txKGkkAKPTk4AoJftViCwY8HC5au/UND1PqfQU0AL+0C7y3ZxtTZDcYISpYQeVk9j8PhT5o9CpNmh+Gw4shlIyB8Kx5a1OOLefcUtxZ3LUo5Kj862H7Lrsh21JY38tHbg1E8nE1hj5jRHgPNrSsMpTjrnrS9rT9ozJMeIyypxXiKKCB0GOtO5WCOtLd7ubVsu0F99xKGyVpKlduKUcjY8mJRjaAdsenRtPOLnhYW2o7So84rqlu86NcNPSPBd3+pFfa0WznemKtxj2h2C4TeZDid2V+CxwDmrX2dshy9uPrX4qUtqKdw6DsaU5V1RGROgDdtWtWcpxRnRlykwo8qTEil4+y4XuXgJHPIrQkNQ1h1+crjardil9rT79whFxhDYjJUQVqUABjrX2xSlqlTm1LwgMbhn60b07tb0LKjuONKcWH9iUqBKs54Hr2qQBVkYTEgTGE9ADVa1r3sFPtJZShwEnPaprOh1MN7eheC3gnbxmpNKWC5znFpTbX3GF9VrbIT+JpiCWsJEbDSitSkuMnapI4NQ/ZrpuBeLa+7Ka3OtvbUrzwkY9KNalsEt9DbEUw0bEbfv30oA9P84o/pS0HTtmbhulCpKvPIW37pX8PgP8azyT4o2xQ5SC0OFFtkJqHBaDTDScJSPzJ+JpJ19qNMBj2KOrMp0H+wPWmW/wB5j2yC7IeWAEjgZ5J9KxzUVyjXSUh5qOtp4p+8Wt3cV/TtXPjhzlbOrLP8caRbs85NpiKuCZHhFIye+8+mO9LF0u8m8XB6dMUVOunkZyAOwHwFW7/JeukZuSWUIbhlLKgjp5uij+BFABkV0Ysajs58mVzSRcDgOc9DXn2gsgpS64hKjylskA/PkVV3GvJOe/0zWrM1Zdg+yrkID0l5hI53sshSs/LekfXNNVo1PZreUl6ddpbnO51yE3ux2/5x+PekU+mc12TnOefWoljjLTKjNxdob594tSbn7ZHckvMujeptTCUEKB4z5zkH6fKrtn1nbrbGfUY0t2Y4Mb8IASPT3jSQwyXFIBKUJWsJC18JSfiaYZ2i7zEQHUxva45GRIhq8ZBH05/Kkko6HUpOyO63iRd5LW7KG0Kyy0DnBPf4qqrIS5FdcbktqbeQohaV+8Fd8/Gidl07dp92itwoEklpSVrUtopSAD6min2naemQ9RCQ0y463cRvSG0lX3gwFJ/Q/Wj3RXFqNiW6+c+gpo0Um6IuKWLc2srcAKx/N+J9KJ6R+zq5ynkP3Jgx2uoCj5voPX41rdnskKzt4YbSlR5UQOSfiaxySVUjTFjd8mWoLa2oaQ+TvA5J9aT9eQnLmq3xmFBLi1rwpXQcU0yrg06sMMrTgcrX2SP8aVddB1xu2GIFArcVtxwcYxU4ts08j9BYsRULBOjlxKlpVjIrquWu0zIsF+KIjhL3JIxX2ulHC9iJqSQ5Jvb5cSkbFFACRjpR6xsJa0RPuBGFIy2D61DrTT7kOa5PY88dw7lEHJ3HrUtpcce0BOiNcrEoZScg461bEEQmzWJZE5EmW7JaKdjachaRxnA7HPBpcvFxtRiIZstieivBZ2P+IpSgfhjoaLacjlV1cIQcGOByKJ2Jh2Hpye0tIStLjq0nbynPNR0PsG27VOo5JTHbajQEMo+/dQwAt5XqT617j3m6S320S7jKdRnlBdISfoOKmt9tnJjx5UhlKUTGstHPWpFaalwmPanHW0gHJTRaQg2hqC9qWChPhJEUF1xKR342/n+lPbS0yUeihWQXmHKEqNcbapRlLSUrGeCB60w6W1QJAbD6yhecBZ9R1Brmzp3fo7PGca/0WteyJz97XEfKm22VcIJ4UOMK+OaVVttsb15KvWtf+0bTCdRWf2yCk+3xUkoKDy6nqUH19R8c+tYxt8NlaSST15zXRhcXHRhnTUtj9p+0Wq4WJ9ptbxcmxwp8K/5agfLt+NTWzQFlUxvc8eQsdlObf0qv9ms9yUh2C7t8JhpKkkDk5J70/wCn4byoyHZSUhTqd2E/H/tWOeUl+pr4yi7UkKjOlbAwr/yptR/pqKsfiag1PBt6dPy40KJHZJbJHhNBPI57U+z7UhSFbeFdqXrrZ3UxFq2hWRyM1zcpJ22djhCqSMFNeeRTfctIJixUOoedUD22ioYul2HUL8WQ6hxKArbtGOSRXcssXs8+WGadNFTT19XbP3d0BcVaipTbid6D80njFPtgu1riOF2G4/CStW7ER3cj/wCs9P7NKFx0ozFaS61JcWjCSokAEZzUEDTJlOLDUhaUJx5iOtJpS2mXHJLHpo2+PqlsNpQ5OS7u91aEbSfgQasp1DCA3BYcxySvoPrWW2awtQUKcckqfUo4SVHgfSibUGKBlKMrJ5Ue1Q8b+y/5C+hpk60bWsoikLPqg8f96ovXK6zGlKJLTWCfMrGfpVKO0wwEBKEpJ5wBiixUFtNo2e+4lGPmef0pLCr2J+TL0KkK8Sv/ABgu1OqK22nyjpgcdDTRrpL76rWiIPvVOkJ+eKCovEW063nx3oKn1SHEkOJGSk4FMF5eUJ1lWQM+1Dj0GDWvFJaOdtyewDIbv1ubLklxTYHTCutdTBqmBc7q683AbKhs4yQAPxrqZIBnT4qpS2pjCndivKCMJFAn1uIlyHIbKkR3lAnZyBgYpjSkGYvNsL3mP3isn8quKiSENKt8WLllYKlnbgJPzq7EKi2p74W3bJCWJJaBQpQ60zvPxrlHlG3oXtKC2UrThW8Jwc/MjNELVZbVDYQ/NmbZgTtKM+XH4GpXVRC8fYA3tSnKlIBAJqWOIjRL74DVntktxTjjaQEoaAJTn1xTxNhtPteDJdBB6jNKMKK01dpTzcMIkvLypaUkgfL0pibhvLHmC8q/lGloCJhDESWiP+znriop2tpaXjA5zXs2SO548UWdVsZz4iPvAohZ6kY6VasaPYLud6yVJR5VZ9TRObPRJnuMpB3NthRPzz/hTdNUCbTtC5p69Tba57NMSVtA4Sr4fD1r3q7QcTUTX7RsryY0lzl1OPI98/RXx/Gh1ydVHkA4SpvqWz0NSWfWSoEkl1pRjK95Odxrn4Sg7idSyRyKpFf7P9MTbfc5aXc7y2G1ApxtwTyfxrTEsIgw2kNjxFJSEALc2Z/70tXD7RbFEiKdLywSPKkIOSfTFKlv+1dqW641OZVEB4bfP3iQO29Iqnyl6CCjB9j+q/RPa0QJv7tKV0aWpJyPUEdR+lWJjTb0dSEqByO1ZDrK/Wq5WpyG2tt5xp37pIO9LSjyS2rHKD3T2+XRLblymkgMypDYHQIdUn9DQsNouWfg9G03G3gWcKkeGjHqcUJhw4VxfU5GkoUhtIQVoOQTnO0epGO1ZY9KkShiVJfeHo44VD8Cacvs9diNSHCt395VwnceGk9ykdSs84qX4/GL2VDyOckqC18tK2y3IccQqIseElYPvKBzn5YNU0NDBRDBaho6uK6qJ/0qvOuSpU+Vb1O7GIzm4JJyGyew/CpmlOvhHhpUGkDKSo8n41pBVFI5sj+bJk71gk5bQnoDVlsrUoADKj7qRXltSmE+I+AQeElXXPwHercFDrjm7oF4yR6elWZl+NGwhK1jjHvK7mjEVppbsRLfISVOHd1yOKhitBOxSnUrSnp5ckURgo5ckEYKzxkdqYA2XYIxuK7qpvLqAkJVUN7HiTrUlJwBKBJHXgUxzD+5KA6YpYuyyida+nMgfoaQibUj83cCh1SGfdSEHGTXyrkuVb3kBqS1vKFnhK+R866gAHcLVdBb3JsN5QwAoJ3Y4qZM6S/GSWznIG7nvTBCmI/ZyQpTYChyCRxUDXsjIwgMfQihiF1u2zZilBx4pSf5oolBt37MZLfiKXnzZNGUSms4Aa/EVXmuh1xJBRgJPumkM8w4yEpCz3GasKI6JNdEdbTGbCwCcdqutNNOebZxToBekMuN3QvF1Owp24FWI60+0r48xSMmilwiRnglKmcpHoaouoZjNEtslCR1PU0CFK7w5EuaQ0k7EnB3DrVR+ykNEOeG2CPexim5d2iKjOojgB/GAtSc4NKsiBcpi9ztwbWr/onA/OkkxsS9WR0xHmIqXQ5sRuUR6n/T86BBIx0q3c5BkyVuFW7J6+oqsnmtUI8V93HvUhTUDhwM0wPpXg0c0U2JOpIrTu7w1bs4OO1L7fmPFM+gFtN6vtgeTubWspUP7JpPoEN1+gW61SopabG1wL3ZUOSMc/nV9vxXk/usdg5/lrOfyql9s0WCLPBcYbQmQ3J2nnJSlSVdR8SkVku3HOxJqEh2baxY1KdD82WlascZISE1YeXaoif3y5xUJHb2hA/jWElYB5Qn+6KlbcUf93gfIU+IWbHJ1bp6GNrczd/8doqz9ap/7SojKSmHb33cdC86lAP6/pWZITu95RJ+IqdpkKOMjnrkU6A3Wy3j9safauDzYSFZ8RtB4Tg84PeqCbrp2Q+hafaVLaXlIJ/lVJ9mqEu6GablFTiS64lKc9E7ulX4FgtkSQXWox3E5yTms2MDtJVJe8Fm373XVklwjkjtXU0OteI8lbLjjJQeC2RmuoFRk95WpM5aUqUBgcZoeXF/zj+NdXVoSfPEXjO5X4mmrRalKal7iTyjqfnXV1JgKWo71cY15kNMSnUISRgBR44FU06iu4HE9/8AvmurqfoCVrVV8aV5Li8PrmpHdWXx5JS7cXVA9c18rqYyqL1cGlbm5K0k9TVgaku+0j2xeCCDwK6uoAXFcZA4A4Fck11dTGWE8tk0NcUd2O2a6upCLSEgJBFXLTKdhXSNKjq2usr3IOOhwa6uoAmusuRKYlLkPLcU4+grKjnJAVQsAFNdXUkNELvFdG5Jrq6gRdbq017wr5XUxscbBdJsK0oajSFNoK1qIHrmrS75cx0mOV1dUMEeE6huqc4mOV1dXUhn/9k=`}
                    alt={`Team Member ${item}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-[#0E0E2C]">Team Member {item}</h3>
                <p className="text-[#0E0E2C] opacity-75 mb-2">
                  {item === 1 ? "Meditation Expert" : item === 2 ? "Nutrition Specialist" : "Fitness Coach"}
                </p>
                <p className="text-[#0E0E2C] max-w-xs mx-auto">
                  Passionate about helping others achieve their wellness goals through personalized guidance.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#0E0E2C] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Life?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join Virtue Fit today and start your journey toward a balanced, healthier lifestyle with our meditation,
            nutrition, and workout programs.
          </p>
          <button className="bg-[#00A8FF] text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-opacity-90 transition-colors">
            Get Started Today
          </button>
        </div>
      </section>
    </div>
  )
}

export default AboutUs

