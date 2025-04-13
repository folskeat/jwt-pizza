How do Video Game Companies perform DevOps?

While there are many things that piqued my curiosity in this class, one thing that I really got thinking about is how DevOps might work for different industries, particularly the video game industry. I can see how DevOps would be very useful for any service connected to the internet, like Google or Netflix, but what about something like video games? There are lots of different kinds of games too. Some games can only be played online, while some can be played offline but get frequent updates via the internet, and some games are released via physical media (discs and cartridges) and then never changed again. So, I did some research to answer some questions. Do all kinds of games benefit from DevOps? How has DevOps affected the games industry? What big companies are adopting these practices?

I researched some articles on how DevOps can relate to game development. These are my findings.

Medium – DevOps Practices in the Gaming Industry by Mauricio Shatski
This article covers some skills needed to work as a DevOps engineer in the games industry. Some imported skills they list include game engine knowledge, scripting and automation, cloud computing using on-premises hardware, and version control. Knowing how to use pipelines and using various automation tools (such as bash scripts) is still just as important as it would be for any DevOps engineer, but understanding how it specifically applies to the games industry is important as well. While you may not be the one programming the games as a gaming DevOps engineer, your automation will include workflows and build systems relating to game engine, such as Unity or Unreal Engine.
Shatski also lists some of the key differences between a games industry DevOps engineer versus other industries. Some differences include build systems specialized to game development, a greater emphasis on testing (especially relating to gameplay), more frequent releases than many industries, and large infrastructures that may include player data in addition to the rest of the code.
In my research I also learned about there being different kinds of Version Control Systems, or VCS. Git, which I am quite familiar with, is a decentralized VCS, meaning that it allows for multiple repositories on multiple local machines that can all be pushed onto a main larger machine. There are also centralized VCS (such as Perforce), which has a single repository housing all code. You can take from the center and push back, but everyone is working from the same place so there are no conflicts. There are various costs and benefits for each.
One interesting aspect of game DevOps is the integration of game engines into the pipeline. Game engines act as framework for many popular games. Having your engine integrated into your pipeline can help streamline all processes of game development, including bug fixes, testing, new updates, and more.
One aspect of game development I had heard of previously, but didn’t know too much about, is called DevKits. SDKs, or Software Development Kits, are ways companies can send tools out to other developers to integrate their software. But companies that make consoles can’t simply send out a download code for their DevKits. This makes DevKits very different from standard SDKs since it is a physical object and not something you can download. Although this is starting to change in more recent years.

Unity – Four Essential DevOps Practices to Make all your Games Stand Out
This article comes from Unity, mentioned previously. They are the creators of the popular game engine Unity, so it was interesting to see an article on DevOps straight from them. In the article, they discuss why DevOps is so important to video game developers. It can help improve release schedules, reduced time wasted, improve development plans, and more.
The four specific methods they mention to improve DevOps is: robust version control, build automation, artifact management, and frequent and automated testing. I thought it was interesting to see how the skills we have learned in this class still apply to different but related fields. We’ve put a big emphasis on version control, automation, and testing. But I was curious about what artifact management was, though. Apparently, it relates to dependencies on packages and resources that aren’t directly related to the game but are still essential. The article also lists several game studios that make frequent use of DevOps, so that’s cool to read about too.

Incredibuild – How DevOps in Game Development is Changing How Studios Work by Joseph Sibony
This article focuses a lot on how developer operations can help with studio burnout, a phenomenon where overworked employees start to lose interest in their craft. Sibony explores how DevOps can be used to improve the lifestyles of these workers and making game development a more sustainable industry.
Several times the article mentions how DevOps hasn’t changed the game yet, but it could (or at least should) soon. To me this shows that DevOps is still growing in the gaming industry, and that it is something that has not yet fully been adopted. This article covers how cloud deployment and automated testing can speed up development process, as well as give the developers more time to breathe.

Assembla – Leveraging DevOps for Game Development by Allison Bokone
This article seems to once again agree with what has been previously mentioned. That DevOps can be used to greatly improve production time for games. Automation is key, as we all know now. They also specifically mention improved project management and stronger collaboration. DevOps can improve how we work as teams and interact with one another, and I quite like that.

Conclusion
After a few articles it seems to be just a lot of repetition, but it is good to see so many in agreement that DevOps would be a great benefit to the gaming industry. And with the direction that industry has been heading the last few years, they could probably use the benefits that come from DevOps. I found the article by Medium to be the most interesting, as they actually dive into what exactly game development DevOps looks like, and how it might differ from DevOps in other industries.
My main takeaways are that DevOps in the gaming industry is similar in process to DevOps in other industries, even if how they go about it is different. Testing and automation are important no matter what you are doing! We want products that we know will satisfy customers and we also want them to come out in a timely manner! No toil! Automation!

Links to the articles:
Medium Article:
https://medium.com/globant/devops-practices-in-the-gaming-industry-differences-with-traditional-industries-1146d0d21ca3

Unity Article:
https://unity.com/resources/four-essential-devops-practices-to-make-all-your-games-stand-out

Incredibuild Article:
https://www.incredibuild.com/blog/how-devops-in-game-development-is-changing-how-studios-work

Assembla Article:
https://get.assembla.com/blog/devops-game-development/
